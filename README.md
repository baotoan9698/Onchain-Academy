# On-chain Academy — Next.js

Homepage rebuilt from the original Framer website and full-page reference. Next.js App Router, TypeScript, React, responsive CSS, and Lucide icons.

## Run

Requires Node.js 20.9 or newer.

```sh
npm install
npm run assets:download
npm run dev
```

Open http://localhost:3000. `assets:download` saves the original images to `public/images` and enables local assets in `.env.local`. Until downloaded, images use their original Framer CDN URLs. Google Fonts serves Inter; system fonts are the fallback.

```sh
npm run typecheck
npm run build
npm start
```

## Editing

- `lib/content.ts`: text, image source map, articles, solutions, testimonials, contributors.
- `app/page.tsx`: homepage sections, navigation, contributor carousel, FAQ.
- `app/globals.css`: styles and responsive breakpoints.
- `app/layout.tsx`: page metadata.

Only the homepage is migrated. Article details, solution pages, and contact links intentionally retain their live URLs on https://on-chain.academy. Migrate those routes before replacing the production domain. FAQ answers are copied from the live site. The adoption navigation scrolls to homepage activities. Activity links lead to relevant existing pages.

If Windows blocks Node from writing to the Documents folder (ENOENT or Access denied), copy the project to a writable development folder before installing. During this session, a runnable preview with downloaded images was prepared under `%TEMP%/on-chain-academy-preview`.

Keyboard focus, skip link, accessible mobile navigation and accordion controls, reduced-motion support, and horizontal touch scrolling are included. No Framer runtime is required.
