# Hanger 18 Tattoos • V5 / Artist-gallery preview

**Upload target:** https://github.com/Hanger18Tattoos/Hanger18Tattoos.github.io

**Preview link after upload:** https://hanger18tattoos.github.io/

This is an upgraded version of the original V5 design. It preserves all previous shop branding, logo, original storefront photograph, shop contact and booking links, and adds five Instagram profile links plus a preview selection of real sourced images.

## Actual art and portraits in this version

- **Sean Strouse:** Portrait image on the existing Hanger 18 website; his individual tattoo photos still need selection / confirmation.
- **Dave F'n Schultz:** Portrait image on the existing Hanger 18 website; his individual tattoo photos still need selection / confirmation.
- **Sammy (@southpawsammyy):** Instagram link, portrait and tattoo gallery not yet downloaded.
- **Glen Hartless (@glenhartless):** Three externally hosted tattoo images attributed by TattoosWizard to Glen; portrait coming later.
- **Ryan Neeb (@ryanneebtattooer):** Instagram link, portrait and tattoo gallery not yet downloaded. Check this handle is current as it could not be verified via public retrieval.
- **Studio work:** Five authentic archived tattoo photos published on the old Hanger 18 gallery. These are **not** attributed to individual artists because the old gallery does not clearly identify who tattooed each piece.

**CRITICAL: The public images listed above are currently HOTLINKED to external websites. They are not yet included as local files in the ZIP because Instagram/Webstagram blocked retrieval and direct downloads of the public images were unavailable. These images may fail to load or stop working, particularly after you change the domain DNS. Do NOT cut over the main domain until we have the actual photo files, replace the hotlinks with files in `assets/`, and get artists' approval.**

The supplied original Hanger 18 storefront photo and logo are bundled locally and will keep working.

## Upload steps

1. Download the new ZIP, then double-click to unzip.
2. Go to https://github.com/Hanger18Tattoos/Hanger18Tattoos.github.io and open the **Code** tab.
3. Click the **+** button next to **Go to file** and choose **Upload files**.
4. Drag **everything INSIDE** the extracted folder into GitHub. Do not upload the ZIP itself or the folder as a single nested folder.
5. Commit on `main`. GitHub Pages is already configured at `main` → `/(root)`.
6. Open https://hanger18tattoos.github.io/ and refresh with Cmd+Shift+R.

When upload is complete, the repository root should show `index.html`, `site-data.js`, `app.js`, `styles.css`, and `assets/`.

## Adding real gallery photos

Put optimized files into `assets/`, named something like `sammy-01.webp`. Then in `site-data.js`, edit the corresponding artist's `portrait` and `gallery` fields.

Example:

```js
portrait:'assets/sammy-portrait.webp',
gallery:[
  'assets/sammy-01.webp',
  'assets/sammy-02.webp',
  'assets/sammy-03.webp'
]
```

All email booking buttons use **hanger18tattoos@hotmail.com**, not the temporary Gmail. Do not change the current domain or email-related DNS records during preview.

Existing shop bio reference: https://www.hanger18tattoos.com/
Existing shop gallery: https://www.hanger18tattoos.com/gallery/
Glen source: https://www.tattooswizard.com/artists/glenhartless
