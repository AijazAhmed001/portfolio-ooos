# Automatically add a project

1. Copy `portfolio.project.json` from this portfolio into the root of the new project folder.
2. Edit its name, slug, description, stack, poster, build directory and links.
3. Put the poster beside the JSON file (the template expects `poster.png`).
4. Build the project so its finished website exists in the configured `buildDirectory` (normally `dist`).
5. Start or build the portfolio. The project is discovered and displayed automatically.

Expected workspace layout:

```text
new projects/
  Aijaz-Premium-Portfolio-Complete/
    portfolio.project.json
  My New Project/
    portfolio.project.json
    poster.png
    dist/
      index.html
```

The scanner and live watcher run automatically with `npm run dev`. On startup, every registered project is rebuilt and copied into the portfolio. While it remains running, changes inside each configured `watchDirectories` folder trigger another build and refresh.

Run a one-time rebuild and sync manually with:

```bash
npm run projects:sync
```

`buildDirectory` is relative to the registered project folder. The scanner copies that finished website into `public/projects/<slug>`. If a project is hosted elsewhere, remove `buildDirectory` and set `live` to its full URL.
