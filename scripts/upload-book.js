#!/usr/bin/env node
/* ==========================================================================
   One-time upload: puts the book PDF into Firestore as base64 chunks at
   bookFile/meta (+ bookFile/meta/chunks/0, 1, 2, ...), the path
   firestore.rules gates behind isVerified(). This is the ONLY way the
   file should ever get there — there is no client-side write path in the
   app, by design (see firestore.rules).

   Why Firestore and not Firebase Storage: Cloud Storage for Firebase now
   requires the paid Blaze plan to provision a bucket at all, even for
   usage that would stay entirely within the free tier. Firestore (Spark,
   free) has no such requirement, so the file is split into <1MiB chunks
   instead — each read is still gated by the same security rules as every
   other collection in this app.

   Usage:
     npm install firebase-admin --no-save
     node scripts/upload-book.js /path/to/service-account.json \
       [/path/to/The-Collaboration-Reflex-Book.pdf]

   Getting a service account key:
     Firebase console → Project settings → Service accounts →
     Generate new private key. Treat the downloaded JSON like a password —
     never commit it. Delete it once this script has run.
   ========================================================================== */
"use strict";

const path = require("path");
const fs = require("fs");

const keyPath = process.argv[2];
const filePath = process.argv[3] || path.join(__dirname, "..", "assets", "files", "The-Collaboration-Reflex-Book.pdf");

// Comfortably under Firestore's 1 MiB (1,048,576 byte) per-document limit —
// base64 is ASCII (1 byte/char) so this chunk is ~450KB on the wire, leaving
// plenty of headroom for field-name/document overhead.
const CHUNK_CHARS = 450000;

if (!keyPath) {
  console.error("Usage: node scripts/upload-book.js /path/to/service-account.json [pdf-path]");
  process.exit(1);
}
if (!fs.existsSync(keyPath)) {
  console.error("Service account key not found:", keyPath);
  process.exit(1);
}
if (!fs.existsSync(filePath)) {
  console.error("PDF not found:", filePath);
  process.exit(1);
}

const admin = require("firebase-admin");
const serviceAccount = JSON.parse(fs.readFileSync(keyPath, "utf8"));
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

async function main() {
  const buf = fs.readFileSync(filePath);
  const base64 = buf.toString("base64");
  const chunks = [];
  for (let i = 0; i < base64.length; i += CHUNK_CHARS) chunks.push(base64.slice(i, i + CHUNK_CHARS));

  const metaRef = db.doc("bookFile/meta");
  const batchLimit = 400; // Firestore batch write cap is 500; leave headroom
  for (let start = 0; start < chunks.length; start += batchLimit) {
    const batch = db.batch();
    chunks.slice(start, start + batchLimit).forEach((data, j) => {
      batch.set(metaRef.collection("chunks").doc(String(start + j)), { data });
    });
    await batch.commit();
    console.log(`Wrote chunks ${start}-${Math.min(start + batchLimit, chunks.length) - 1} of ${chunks.length}`);
  }

  await metaRef.set({
    fileName: path.basename(filePath),
    mimeType: "application/pdf",
    totalSize: buf.length,
    chunkCount: chunks.length,
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  });

  console.log(`Uploaded ${filePath} (${buf.length} bytes) as ${chunks.length} chunk(s) -> bookFile/meta`);
}

main().then(() => process.exit(0)).catch(err => {
  console.error("Upload failed:", err.message || err);
  process.exit(1);
});
