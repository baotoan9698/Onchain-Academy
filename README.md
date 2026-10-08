# On-chain Academy — Next.js

Homepage, blog listing, and 15 complete articles migrated from the original Framer website. Next.js App Router, TypeScript, React, SQLite (sql.js), responsive CSS, and Lucide icons.

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

The homepage and all blog links now use local routes. Solution detail pages and contact links still retain their live URLs on https://on-chain.academy; migrate those routes before replacing the production domain. FAQ answers are copied from the live site. The adoption navigation scrolls to homepage activities.

## Blog data and routes

- `/blogs`: first 9 articles, with Load More revealing the remaining 6.
- `/blogs/[slug]`: full article with original slug, metadata, local images, and a return link. Unknown slugs return 404.
- `data/blog.sqlite`: SQLite database with 15 articles and 52 image records. Image bytes live in `public/images/blogs`; their local path, original URL, type, and size are stored in the database.
- `data/blog-seed.json`: readable migration snapshot, including all article HTML and media references.
- `data/schema.sql`: database schema. `lib/blogs.ts` queries SQLite on the server with bound parameters.
- `scripts/import-blogs.py`: repeatable importer for the owner's public source website. Requires Python, requests, and beautifulsoup4. Run `python scripts/import-blogs.py --output .` only when intentionally refreshing the migration snapshot and original media.
- `npm run db:seed`: creates a database from the snapshot if it is missing. Also runs before dev/build. Existing database edits are never overwritten. To refresh the database from a new snapshot, back up the existing database, move it aside, then run the seed command. Restart/rebuild the app after database edits.
- `npm run check:blogs`: validates all imported records, images, sanitized HTML, and local article links.

All 15 source articles retain their original English/Vietnamese content and publication dates. The importer strips Framer markup, scripts, inline styles, and event handlers. Database files and local blog images are included in Git; there is no external database account or hosted CMS to configure. Blog pages are prerendered from SQLite at build time; editing content requires rebuilding for production. This is a read-only publishing setup, not an admin editor. The SQLite file and SQL.js WebAssembly asset are explicitly included in Next.js output tracing.

If Windows blocks Node from writing to the Documents folder (ENOENT or Access denied), copy the project to a writable development folder before installing. During this session, a runnable preview with downloaded images was prepared under `%TEMP%/on-chain-academy-preview`.

Keyboard focus, skip link, accessible mobile navigation and accordion controls, reduced-motion support, and horizontal touch scrolling are included. No Framer runtime is required.
