import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
const root = new URL("../", import.meta.url);
const posts = JSON.parse(await readFile(new URL("data/solutions.json", root), "utf8"));
const images = JSON.parse(await readFile(new URL("data/solution-images.json", root), "utf8"));
const base = process.argv[2];
assert.equal(posts.length, 3);
assert.equal(new Set(posts.map(p => p.slug)).size, 3);
for (const post of posts) {
  assert(post.bodyHtml.length > 1000);
  assert(!/<script|\son\w+=|javascript:/i.test(post.bodyHtml));
  for (const [, src] of post.bodyHtml.matchAll(/src="([^"]+)"/g)) {
    assert(Object.values(images).includes(src));
  }
  if (base) {
    const response = await fetch(`${base}/solution/${post.slug}`);
    assert.equal(response.status, 200);
    assert((await response.text()).includes(post.bodyHtml));
  }
}
for (const path of Object.values(images)) {
  await access(new URL("public" + path, root));
  if (base) {
    const response = await fetch(base + path, {method: "HEAD"});
    assert.equal(response.status, 200);
    assert(response.headers.get("content-type").startsWith("image/"));
  }
}
if (base) {
  const index = await fetch(base + "/solution");
  assert.equal(index.status, 200);
  const html = await index.text();
  for (const post of posts) assert(html.includes(`/solution/${post.slug}`));
  assert.equal((await fetch(base + "/solution/does-not-exist")).status, 404);
}
console.log(`PASS: ${posts.length} full solution pages, ${Object.keys(images).length} local images${base ? ", routes and 404" : ""}.`);
