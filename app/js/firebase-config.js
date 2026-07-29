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

/* authDomain is what the Google sign-in popup shows the user: it currently
   reads "continue to angular5-firebase-project.firebaseapp.com", because this
   platform runs on a Firebase project recycled from an older, unrelated app.

   To brand it, complete these first — switching the value before they are all
   done will break Google sign-in outright:
     1. Firebase Console -> Hosting: add a site in this project and connect the
        custom domain auth.yasassri.me (DNS records at the registrar), then
        deploy once so the site is live. Firebase serves /__/auth/handler there
        automatically. The main site stays on Azure Static Web Apps.
     2. Firebase Console -> Authentication -> Settings -> Authorized domains:
        add auth.yasassri.me
     3. Google Cloud -> Credentials -> the Web OAuth client: add
        https://auth.yasassri.me to Authorized JavaScript origins and
        https://auth.yasassri.me/__/auth/handler to Authorized redirect URIs

   Then swap the two authDomain lines below.

   Separately, and independent of all this: set the app name shown on the
   consent screen at Google Cloud -> APIs & Services -> OAuth consent screen.
   That is the "Sign in to <name>" text, and changing it takes effect
   immediately. Adding a logo triggers brand verification that can take weeks,
   so do the logo separately rather than letting it hold up the name. */
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyC8LHrgUThse-coX0nS3oEWKIZ8lPZXWdg",
  authDomain: "angular5-firebase-project.firebaseapp.com",
  // authDomain: "auth.yasassri.me",   // <- use this once steps 1-3 above are done
  projectId: "angular5-firebase-project",
  storageBucket: "angular5-firebase-project.firebasestorage.app",
  messagingSenderId: "257908872185",
  appId: "1:257908872185:web:8a2e5cd8216a6e5df3e328"
};

/* Admin accounts — must match the emails listed in firestore.rules.
   Sign in with one of these (email must be verified; Google sign-in is
   verified automatically) to see the Admin Dashboard. */
window.PLATFORM_ADMINS = ["yasassriofficial@gmail.com"];

/* Email notifications for platform submissions.
   -------------------------------------------------------------------------
   There is no backend here, so consultation requests, speaking invitations,
   newsletter signups and book requests land in Firestore and notify nobody
   until this is set. Paste a form-to-email endpoint (Formspree, Web3Forms or
   similar) below and every submission also posts a summary to your inbox.

   Use a DIFFERENT form from the one in contact.html (f/xleookvv). Keeping
   them separate means platform mail stays distinguishable from contact-page
   mail, and one form hitting its monthly cap can't silence the other.

   Left empty, notifications are simply skipped — nothing else changes. */
window.PLATFORM_NOTIFY_ENDPOINT = "";
