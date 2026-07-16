/* ==========================================================================
   Firebase configuration — Academic Platform
   --------------------------------------------------------------------------
   1. Create a Firebase project at https://console.firebase.google.com
   2. Add a Web App (</> icon) and paste its config object below.
   3. Follow PLATFORM_SETUP.md in the repository root for Auth, Firestore
      and security-rules setup.

   Until real values are pasted here, the platform runs in "preview mode":
   all pages render, but forms and the forum are disabled with a notice.
   ========================================================================== */

window.FIREBASE_CONFIG = {
  apiKey: "PASTE_YOUR_API_KEY",
  authDomain: "PASTE_YOUR_PROJECT.firebaseapp.com",
  projectId: "PASTE_YOUR_PROJECT_ID",
  storageBucket: "PASTE_YOUR_PROJECT.appspot.com",
  messagingSenderId: "PASTE_SENDER_ID",
  appId: "PASTE_APP_ID"
};

/* Admin accounts — must match the emails listed in firestore.rules.
   Sign in with one of these (email must be verified; Google sign-in is
   verified automatically) to see the Admin Dashboard. */
window.PLATFORM_ADMINS = ["yasassriofficial@gmail.com"];
