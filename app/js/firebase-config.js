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
  apiKey: "AIzaSyC8LHrgUThse-coX0nS3oEWKIZ8lPZXWdg",
  authDomain: "angular5-firebase-project.firebaseapp.com",
  projectId: "angular5-firebase-project",
  storageBucket: "angular5-firebase-project.firebasestorage.app",
  messagingSenderId: "257908872185",
  appId: "1:257908872185:web:8a2e5cd8216a6e5df3e328"
};

/* Admin accounts — must match the emails listed in firestore.rules.
   Sign in with one of these (email must be verified; Google sign-in is
   verified automatically) to see the Admin Dashboard. */
window.PLATFORM_ADMINS = ["yasassriofficial@gmail.com"];
