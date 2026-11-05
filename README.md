# HANGER 18 TATTOOS | Website V1

A responsive, single-page static website built for GitHub Pages. No framework, plugins, passwords, payments or build commands required.

## Publish a temporary website without touching hanger18tattoos.com

1. Sign in at GitHub as **Hanger18Tattoos**.
2. Create a **Public** repository named **Hanger18Tattoos.github.io** (exact spelling, case is not critical). Do not create a README when creating it.
3. Extract `hanger18-website.zip`. Open the extracted **hanger18-website** folder.
4. In the GitHub repository, choose **Add file > Upload files**. Drag in **the files and the assets folder inside** the extracted folder (not the ZIP itself), then **Commit changes**.
5. Open **Settings > Pages**. For Build and deployment choose **Deploy from a branch**, select **main** and **/(root)**, then save.
6. Temporary website URL: **https://hanger18tattoos.github.io/** .
7. The published preview is public. Artist placeholders clearly indicate content is unfinished.

If GitHub reports a repository already exists with that name, use that repository and preserve existing files, or choose a new repo name such as `hanger18-site` and the preview address will be `https://hanger18tattoos.github.io/hanger18-site/`.

## Update site content later

Edit **`site-data.js`** for all five artists:

- `name`, `role`, `bio`: Text content.
- `specialties`: Example `['Black & Grey','Realism']`, if confirmed.
- `portrait`: Example `"assets/sean-portrait.webp"`.
- `work`: Example `["assets/sean-work-1.webp", "assets/sean-work-2.webp", "assets/sean-work-3.webp"]` (three shown per artist).
- `instagram`: An actual artist Instagram profile URL beginning `https://`.
- `bookingUrl`: An actual booking link. When blank, the artist's booking button opens an email to the studio with the artist's name in the subject.
- `contactEmail`: Set to the shop email `hanger18tattoos@hotmail.com`. All general inquiries and default artist bookings go here.

Place all approved images under `assets/` and commit the changed files. The site updates automatically.

The shop photograph placeholder is in `index.html` in `.intro-art`. When the real shop photo is supplied, replace the placeholder block with an `img` and style it in CSS.

## Before launch

- Approve the final studio logo and photos, all bios, artist socials and booking links.
- Confirm actual opening hours, address and phone with Sean. Currently based on the existing public website: **417 Richmond Street, London ON / 519-432-7666 / Monday–Saturday 10–6**.
- Verify the new custom email receives mail before switching contact address; Gmail/Google Workspace mail may need MX, SPF, DKIM and DMARC records.
- Check links and image display on mobile.
- Obtain domain registrar and DNS access. Backup/screenshot the existing records and **preserve existing MX/TXT/email records**.
- In GitHub: Settings > Pages > Custom domain -> `hanger18tattoos.com` after DNS is ready. Configure GitHub Pages DNS records at the registrar, HTTPS, and www redirect as recommended in the latest GitHub docs. Do not replace DNS until approved.
- Keep the current site live until final cutover. Domain ownership and registrar account should remain under Sean/Hanger 18.

## Known limitations in this draft

- Art and portraits are intentionally placeholders, not stock tattoos misrepresented as the team’s work.
- Artist biographies are explicitly labelled coming soon rather than invented.
- This static website has **no server-side booking form**; buttons use email or a configured existing booking system.
- The studio logo is a *typographic placeholder*, not an attempt to reproduce an unprovided official logo.
- The map is a styled graphic with a real link to Google Maps, not an embedded interactive map.

## Files

- `index.html` — page structure and shop details
- `styles.css` — layout, visual style and responsiveness
- `site-data.js` — artist content and email config (edit this most often)
- `app.js` — builds artist sections, mobile navigation and tattoo gallery lightboxes
- `assets/` — logo and photo assets
