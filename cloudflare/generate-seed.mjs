// Only for regenerating the initial migration before its first deployment.
import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { categories } from './src/categories.js';

const require = createRequire(import.meta.url);
const { parse } = require('@babel/parser');
const source = await readFile(new URL('../src/pages/ConstructionProjects/legacyProjects.js', import.meta.url), 'utf8');
const data = parse(source, { sourceType: 'module' }).program.body[0].declarations[0].init;
const property = (node, key) => node.properties.find(({ key: prop }) => prop.name === key || prop.value === key)?.value;
const sql = (value) => "'" + value.replaceAll("'", "''") + "'";
const statements = ['-- Generated from the existing public gallery. Do not renumber IDs or reapply after launch.'];

for (const { key, value } of data.properties) {
  const category = key.name ?? key.value;
  if (!Object.hasOwn(categories, category)) throw new Error(`Unknown category ${category}`);
  for (const [index, project] of property(value, 'projects').elements.entries()) {
    const id = `legacy-${category}-${index + 1}`;
    const images = property(project, 'images').elements.map((photo, i) => ({
      source: 'legacy',
      id: `${id}-${i + 1}`,
      alt: property(photo, 'alt').value,
    }));
    const strings = [id, category, property(project, 'title').value, property(project, 'title1')?.value ?? '', JSON.stringify(images)];
    statements.push(`INSERT INTO projects (id, category, title, subtitle, images_json, published, sort_order) VALUES (${strings.map(sql).join(', ')}, 1, ${(index + 1) * 10});`);
  }
}
await writeFile(new URL('./migrations/0002_legacy_projects.sql', import.meta.url), statements.join('\n') + '\n');
