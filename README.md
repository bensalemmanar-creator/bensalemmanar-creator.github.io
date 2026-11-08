# Manar Ben Salem: Portfolio

A static personal portfolio site (HTML + CSS + vanilla JS). It has no build step and no framework.

## Run locally

```bash
python -m http.server 5173
```

Then open http://localhost:5173.

Use a local server rather than opening `index.html` directly, so that the embedded prototypes load correctly.

## Structure

| Path | What it is |
|---|---|
| `index.html` | All page sections (hero, about, projects, design, experience, education, skills, certifications, contact) |
| `css/style.css` | Design tokens and all styles. Colours and fonts are set at the top in `:root` |
| `js/data.js` | **Project content.** Edit this file to change project text, results, links and images |
| `js/main.js` | Renders the cards and case-study modals, plus filters, navigation and animations |
| `assets/img/` | Portrait, plus chart and screen images in `projects/` |
| `assets/cv/` | The CV PDF behind the "Download CV" links |
| `prototypes/` | Built Figma Make code bundles for SABA GrowTrack and LegacyOS (live, clickable) |

## Content sources

All content comes from the CV, the GitHub READMEs, the project files (`.Rmd`, `.do`, `.ipynb`, `.jasp`) and the project slide decks. Nothing is invented.

## Still to add

- **Figma links:** the "Open in Figma" buttons point to your own files. Visitors can only open them if you set each file's sharing to "Anyone with the link can view" in Figma.
- **Power BI dashboards:** the charts are redrawn from each .pbix data model (read with `pbixray`), not screenshots. To show the real report pages too, export them from Power BI Desktop (File → Export → PDF or PowerPoint) and add the images to `biDashboards` in `js/data.js`.
- **Prototypes:** the SABA GrowTrack and LegacyOS builds in `prototypes/` were compiled from the Figma Make code bundles. To rebuild one, run `npm i` and then `npx vite build --base=./` in its source folder.

## Deploy

The folder is static, so it can be dropped as-is into GitHub Pages, Netlify or Vercel.
