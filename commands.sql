CREATE TABLE blogs (
  id INTEGER PRIMARY KEY,
  author TEXT,
  url TEXT,
  title TEXT,
  likes INTEGER DEFAULT 0
);