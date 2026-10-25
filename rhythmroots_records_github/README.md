# RhythmRoots Records — React + Tailwind

Responsive React website for RhythmRoots Records using Vite, Tailwind CSS, and a custom responsive stylesheet. Brand direction: dark premium tones, antique gold and ivory, Louisiana/New Orleans roots, and the tagline “From Footsteps to Frequencies.”

## Stack
- React 18
- Vite 5
- Tailwind CSS 3
- GitHub Pages deployment through GitHub Actions

## Local development
From this directory run: npm install, then npm run dev.

Production build: npm run build. Preview it with npm run preview.

The logo in the assets directory is copied into the build output root by Vite's publicDir setting.

## Deployment
Push to main. GitHub Actions installs dependencies, builds the app, and deploys dist/ to GitHub Pages. The repository base path is configured in vite.config.js. The workflow also keeps the previous nested URL working.

## Before public launch
- Replace YOUR-LABEL-EMAIL@example.com in src/App.jsx with the real label inbox. The form opens a prepared email draft; it is not a server-backed form.
- Replace concept artwork/text with confirmed releases and official links.
- Add approved artist biography, photos, social links, and streaming profiles.
- Google Fonts are loaded remotely; system fallbacks are provided.
