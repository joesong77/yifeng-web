CREATE TABLE projects (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL CHECK (category IN ('building', 'civil', 'infrastructure', 'water', 'conservation', 'teardown', 'landscape', 'volunteer')),
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL DEFAULT '',
  images_json TEXT NOT NULL DEFAULT '[]' CHECK (json_valid(images_json)),
  published INTEGER NOT NULL DEFAULT 0 CHECK (published IN (0, 1)),
  sort_order INTEGER NOT NULL DEFAULT 0,
  version INTEGER NOT NULL DEFAULT 1
);

CREATE INDEX projects_public_sort ON projects(published, category, sort_order, id);
