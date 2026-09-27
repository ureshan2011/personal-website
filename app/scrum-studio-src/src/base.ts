// Where this bundle was loaded from, so the studio's font resolves next to
// it whichever page embeds it. Read once, while the script is executing.
export const SCRIPT_BASE =
  (document.currentScript as HTMLScriptElement | null)?.src || window.location.href;
