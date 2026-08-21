# VANTA React runtime fix

This revision addresses the React development crash:

`TypeError: destroy is not a function`

Changes:

- Replaced legacy `framer-motion` imports with current `motion/react`.
- Pinned React, React DOM, React Router, Motion, and Zustand versions for repeatable installs.
- Removed Motion `useScroll` from the custom scroll-progress, parallax, and image-expansion components; these now use explicit requestAnimationFrame listeners with proper cleanup functions.
- Rewrote project `useEffect` callbacks so an effect returns only `undefined` or a cleanup function.
- Added a route-level `errorElement` with a branded VANTA fallback screen.
- Preserved React Strict Mode rather than hiding lifecycle problems by disabling it.

## Clean install

Because the old project installed a different animation dependency graph, delete the old install before running this revision.

PowerShell:

```powershell
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue
npm install
npm run dev
```
