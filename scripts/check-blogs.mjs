import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { createRequire } from "node:module";
import initSqlJs from "sql.js";
const root = new URL("../", import.meta.url);
const require = createRequire(import.meta.url);
const SQL = await initSqlJs({
  locateFile: () => require.resolve("sql.js/dist/sql-wasm.wasm"),
});
const db = new SQL.Database(await readFile(new URL("data/blog.sqlite", root)));
const seed = JSON.parse(
  await readFile(new URL("data/blog-seed.json", root), "utf8"),
);
assert.equal(db.exec("PRAGMA integrity_check")[0].values[0][0], "ok");
assert.equal(db.exec("SELECT count(*) FROM posts")[0].values[0][0], 15);
assert.equal(
  db.exec("SELECT count(*) FROM images")[0].values[0][0],
  seed.images.length,
);
const slugs = new Set(seed.posts.map((p) => p.slug));
for (const post of seed.posts) {
  const rows = db.exec(
    "SELECT title, body_html, cover FROM posts WHERE slug = ?",
    [post.slug],
  )[0].values;
  assert.equal(rows[0][0], post.title);
  assert.equal(rows[0][1], post.body_html);
  assert.ok(post.body_html.length > 500, post.slug);
  assert.ok(!/<script\b|\son\w+=|javascript:/i.test(post.body_html), post.slug);
  const assets = [
    post.cover,
    ...[...post.body_html.matchAll(/<img[^>]+src="([^"]+)"/g)].map((m) => m[1]),
  ];
  for (const asset of assets) {
    assert.ok(/^\/images\/blogs\/[a-zA-Z0-9._-]+$/.test(asset), asset);
    assert.ok((await stat(new URL("public" + asset, root))).size > 0, asset);
  }
  for (const [, slug] of post.body_html.matchAll(
    /href="\/blogs\/([^"/#]+)\/?"/g,
  ))
    assert.ok(slugs.has(slug), slug);
}
db.close();
console.log(
  `PASS: 15 full articles, ${seed.images.length} local images, SQLite integrity, safe HTML, and internal links.`,
);
