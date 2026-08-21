# Automatic project registry

Add one folder under `projects-source/` with a complete `project.json`, then place the built web project in `public/projects/<slug>/`. Running `npm run dev` uses the last generated manifest; run `npm run projects:manifest` after adding or changing metadata. Every production `npm run build` regenerates the manifest automatically.

The `live` value controls the embedded viewer and Live button. The `github` value controls the GitHub button. Use `status: "draft"` to hide unfinished work.
