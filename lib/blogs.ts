import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import initSqlJs, { type Database } from "sql.js";

export type BlogSummary = {
  slug: string;
  title: string;
  publishedAt: string;
  excerpt: string;
  cover: string;
  readingMinutes: number;
};
export type BlogPost = BlogSummary & { bodyHtml: string; sourceUrl: string };
let database: Promise<Database> | undefined;
function getDatabase() {
  if (!database)
    database = (async () => {
      const SQL = await initSqlJs({
        locateFile: () =>
          path.join(
            process.cwd(),
            "node_modules",
            "sql.js",
            "dist",
            "sql-wasm.wasm",
          ),
      });
      const file = await readFile(
        path.join(process.cwd(), "data", "blog.sqlite"),
      );
      return new SQL.Database(file);
    })();
  return database;
}
const summaryColumns =
  "slug, title, published_at AS publishedAt, excerpt, cover, reading_minutes AS readingMinutes";
export async function getBlogs(): Promise<BlogSummary[]> {
  const db = await getDatabase();
  const statement = db.prepare(
    `SELECT ${summaryColumns} FROM posts ORDER BY published_at DESC, slug ASC`,
  );
  const posts: BlogSummary[] = [];
  try {
    while (statement.step())
      posts.push(statement.getAsObject() as unknown as BlogSummary);
  } finally {
    statement.free();
  }
  return posts;
}
export async function getBlog(slug: string): Promise<BlogPost | null> {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  const db = await getDatabase();
  const statement = db.prepare(
    `SELECT ${summaryColumns}, body_html AS bodyHtml, source_url AS sourceUrl FROM posts WHERE slug = ?`,
  );
  try {
    statement.bind([slug]);
    return statement.step()
      ? (statement.getAsObject() as unknown as BlogPost)
      : null;
  } finally {
    statement.free();
  }
}
