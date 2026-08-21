# VANTA — Premium E-Commerce Storefront

A frontend-only premium fashion/lifestyle commerce experience built with React, TypeScript, Vite, Zustand and Framer Motion.

## Features

- Cinematic editorial homepage with masked text reveals, parallax, image expansion and sticky storytelling
- Responsive glass/translucent navigation, mega-menu and mobile drawer
- Fullscreen search with autocomplete, trending and recent searches
- Product listing with advanced filters, sorting, active chips, grid density and Load More
- Product detail pages with color variants, size selector, size guide, stock messaging, delivery estimate and animated cart CTA
- Fullscreen gallery, hover image swaps, wishlists and product recommendations
- Persistent LocalStorage cart, wishlist, checkout draft, recent searches and recently viewed products
- Animated cart drawer with quantity controls, move-to-wishlist, promo code and free-shipping progress
- Interactive lookbook hotspots
- Responsive multi-step frontend-only checkout with shipping, demo payment, review and success state
- Reduced-motion accessibility support and keyboard-friendly native controls

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

### Demo promo code

`VANTA10`

> This project is frontend-only. Payment fields are demo UI and do not submit or store real card details.

## React 19 / animation compatibility reset

This build uses the current `motion` package (`motion/react`) instead of the legacy `framer-motion` import path and pins the React/runtime versions used by the project.

If you previously installed dependencies from an older VANTA ZIP, perform one clean install before running this version:

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

Windows PowerShell:

```powershell
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue
npm install
npm run dev
```
