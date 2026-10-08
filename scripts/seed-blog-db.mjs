import { readFile, writeFile, access } from "node:fs/promises";
import { createRequire } from "node:module";
import initSqlJs from "sql.js";

const root = new URL("../", import.meta.url);
const file = new URL("data/blog.sqlite", root);
try {
  await access(file);
  console.log("Using existing data/blog.sqlite (no data overwritten).");
} catch (error) {
  if (error.code !== "ENOENT") throw error;
  const require = createRequire(import.meta.url);
  const SQL = await initSqlJs({
    locateFile: () => require.resolve("sql.js/dist/sql-wasm.wasm"),
  });
  const db = new SQL.Database();
  const seed = JSON.parse(
    await readFile(new URL("data/blog-seed.json", root), "utf8"),
  );
  if (
    seed.posts.length !== 15 ||
    new Set(seed.posts.map((p) => p.slug)).size !== 15
  )
    throw new Error("Expected 15 unique imported posts");
  db.run(await readFile(new URL("data/schema.sql", root), "utf8"));
  db.run("BEGIN TRANSACTION");
  for (const p of seed.posts) {
    if (
      !/^[a-z0-9-]+$/.test(p.slug) ||
      !p.body_html ||
      !p.cover.startsWith("/images/blogs/")
    )
      throw new Error(`Invalid post: ${p.slug}`);
    db.run("INSERT INTO posts VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [
      p.slug,
      p.title,
      p.published_at,
      p.excerpt,
      p.cover,
      p.body_html,
      p.source_url,
      p.reading_minutes,
    ]);
  }
  for (const image of seed.images) {
    await access(new URL("public" + image.path, root));
    db.run("INSERT INTO images VALUES (?, ?, ?, ?, ?)", [
      image.path,
      image.source_url,
      image.alt,
      image.mime_type,
      image.bytes,
    ]);
  }
  db.run("INSERT INTO migration_metadata VALUES (?, ?)", [
    "imported_at",
    seed.imported_at,
  ]);
  db.run("COMMIT");
  await writeFile(file, db.export());
  db.close();
  console.log(
    `Created SQLite database: ${seed.posts.length} articles, ${seed.images.length} images.`,
  );
}
