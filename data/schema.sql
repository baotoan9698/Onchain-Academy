CREATE TABLE posts (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  published_at TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  cover TEXT NOT NULL,
  body_html TEXT NOT NULL,
  source_url TEXT NOT NULL,
  reading_minutes INTEGER NOT NULL CHECK (reading_minutes > 0)
);
CREATE INDEX posts_published_at ON posts(published_at DESC);
CREATE TABLE images (
  path TEXT PRIMARY KEY,
  source_url TEXT NOT NULL UNIQUE,
  alt TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  bytes INTEGER NOT NULL
);
CREATE TABLE migration_metadata (key TEXT PRIMARY KEY, value TEXT NOT NULL);
