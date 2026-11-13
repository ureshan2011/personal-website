# CV room: Instagram photo wall

The 3D room at `/cv/` hangs a few of your Instagram photos on a wall. It reads
`content/cv-room/instagram.json` (handle, profile, and up to 9 posts, each with an image path,
size, caption and timestamp). The images are local copies in `assets/cv-room/instagram/`, so
the page never talks to Instagram at runtime.

`scripts/sync-instagram-wall.mjs` maintains both. The workflow "Instagram wall sync"
(`.github/workflows/instagram-wall.yml`) runs it daily and on demand; if anything changed it
commits to `main` and deploys to Azure Static Web Apps.

## Add or remove a post today (no token)

Option 1, GitHub: Actions tab -> "Instagram wall sync" -> Run workflow. Paste the post URL
into `add_post_url` (or a URL or shortcode into `remove_post`) and run it.

Option 2, locally:

    node scripts/sync-instagram-wall.mjs --add https://www.instagram.com/p/<code>/
    node scripts/sync-instagram-wall.mjs --remove <url-or-code>

then commit `content/cv-room` and `assets/cv-room/instagram`. New posts go to the front of the
list; the wall holds `MAX_POSTS` (9, set at the top of the script), and older ones drop off.
Captions and dates stay empty in this mode.

Caveat: without a token the script downloads `<post-url>media/?size=l`, an unofficial
Instagram image URL. It can stop working or be rate-limited without notice. The script never
saves an error page (it checks the file type and size), keeps the previous image on failure and
prints a warning, but it cannot fetch new photos while Instagram refuses. That is why the token
path below exists.

## Make it fully automatic (token)

1. In Meta for Developers, create an app and add the "Instagram API with Instagram Login"
   product. Add your own Instagram account as a tester/role and accept the invite in Instagram.
2. Generate a long-lived access token for your account (`instagram_business_basic` scope).
3. In the GitHub repo: Settings -> Secrets and variables -> Actions -> New repository secret,
   name `INSTAGRAM_TOKEN`, value the token.

With the token set, each run reads your newest posts from the official API, fills in captions
(first line, up to 140 characters) and timestamps, and keeps the newest 9. Videos use their
thumbnail; carousels use the first image.

Token lifetime: long-lived tokens last about 60 days. Each run calls the refresh endpoint,
which extends the life of the same token; it does not create a new one and the workflow cannot
store a new secret. If the token ever expires (for example the workflow was disabled for over
60 days, or the app or permissions changed), the API call fails, the run logs a warning and
keeps the current wall unchanged, and you must generate a new token and paste it into the
`INSTAGRAM_TOKEN` secret.

## Notes

- Check the Actions log if the wall stops updating; failed downloads and token problems are
  logged as warnings.
- Images are resized to at most 1080 px, JPEG quality 84, metadata stripped (ImageMagick when
  available). Consider what is visible in each photo (number plates, signage) before adding it.

## Pinned and excluded posts

`instagram.json` also keeps two id lists. A post you add by hand is `pinned`: it stays at the
front of the wall even after newer posts arrive. A post you remove is `excluded`: the daily sync
will not bring it back. Adding a post again takes it off the excluded list.
