#!/usr/bin/env node
/* ==========================================================================
   One-time upload: puts the book PDF into Firebase Storage at the path
   storage.rules gates (book/The-Collaboration-Reflex-Book.pdf). This is
   the ONLY way the file should ever get there — there is no client-side
   upload path in the app, by design (see storage.rules).

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
const destination = "book/The-Collaboration-Reflex-Book.pdf";

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

// app/js/firebase-config.js is a browser script (sets window.FIREBASE_CONFIG),
// not JSON — pull the storageBucket out of it with a small regex rather than
// requiring a second source of truth.
const configSrc = fs.readFileSync(path.join(__dirname, "..", "app", "js", "firebase-config.js"), "utf8");
const bucketMatch = configSrc.match(/storageBucket:\s*["']([^"']+)["']/);
if (!bucketMatch) {
  console.error("Couldn't find storageBucket in app/js/firebase-config.js");
  process.exit(1);
}
const storageBucket = bucketMatch[1];

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket
});

admin.storage().bucket().upload(filePath, {
  destination,
  metadata: { contentType: "application/pdf" }
}).then(() => {
  console.log(`Uploaded ${filePath} -> gs://${storageBucket}/${destination}`);
  console.log("Next: deploy storage.rules (firebase deploy --only storage) if you haven't already.");
  process.exit(0);
}).catch(err => {
  console.error("Upload failed:", err.message || err);
  process.exit(1);
});
