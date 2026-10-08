import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const base = process.argv[2] || 'http://localhost:3001';
const seed = JSON.parse(await readFile(new URL('../data/blog-seed.json', import.meta.url), 'utf8'));
const index = await fetch(`${base}/blogs`);
assert.equal(index.status, 200);
const listing = await index.text();
assert.ok(listing.includes('Load More'));
for (const post of seed.posts) {
  const response = await fetch(`${base}/blogs/${post.slug}`);
  assert.equal(response.status, 200, post.slug);
  const html = await response.text();
  assert.equal((html.match(/<h1\b/g) || []).length, 1, post.slug);
  assert.ok(html.includes(post.body_html), `Full body missing: ${post.slug}`);
}
for (const image of seed.images) {
  const response = await fetch(base + image.path, {method:'HEAD'});
  assert.equal(response.status, 200, image.path);
  assert.ok(response.headers.get('content-type')?.startsWith('image/'), image.path);
}
const missing = await fetch(`${base}/blogs/nonexistent-article-check`);
assert.equal(missing.status, 404);
console.log(`PASS: listing, all 15 complete article pages, ${seed.images.length} served images, and unknown-slug 404.`);
