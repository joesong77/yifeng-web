import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { test } from 'node:test';
import worker from '../src/worker.js';

const base = 'https://yifeng.test';
const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jLZkAAAAASUVORK5CYII=', 'base64');

function setup() {
  const sqlite = new DatabaseSync(':memory:');
  for (const file of ['0001_projects', '0002_legacy_projects']) {
    sqlite.exec(readFileSync(new URL(`../migrations/${file}.sql`, import.meta.url), 'utf8'));
  }
  const photos = new Map();
  const env = {
    ADMIN_PASSWORD: 'test-only-long-password',
    DB: { prepare: (sql) => ({ bind: (...args) => ({
      first: async () => sqlite.prepare(sql).get(...args),
      run: async () => ({ meta: sqlite.prepare(sql).run(...args) }),
    }), all: async () => ({ results: sqlite.prepare(sql).all() }) }) },
    LOGIN_LIMIT: { limit: async () => ({ success: true }) },
    PHOTOS: {
      put: async (id, body, metadata) => photos.set(id, { body, writeHttpMetadata: (headers) => headers.set('Content-Type', metadata.httpMetadata.contentType) }),
      get: async (id) => photos.get(id),
      delete: async (keys) => { for (const key of [keys].flat()) photos.delete(key); },
    },
  };
  const call = (path, options = {}) => {
    const { json, headers = {}, ...init } = options;
    return worker.fetch(new Request(base + path, {
      ...init,
      headers: { Origin: base, ...(json ? { 'Content-Type': 'application/json' } : {}), ...headers },
      body: json ? JSON.stringify(json) : init.body,
    }), env, { waitUntil() {} });
  };
  return { call, env, photos };
}

test('all 65 seeded public projects and 370 legacy photos are exposed without login', async () => {
  const { call } = setup();
  const res = await call('/api/projects', { headers: { Origin: 'https://ea-fon.com' } });
  assert.equal(res.headers.get('Access-Control-Allow-Origin'), '*');
  const data = await res.json();
  assert.equal(data.schemaVersion, 1);
  assert.equal(data.projects.length, 65);
  assert.equal(data.projects.flatMap((p) => p.images).length, 370);
  assert.equal(new Set(data.projects.map((p) => p.category)).size, 8);
  assert.ok(data.projects.every((p) => !Object.hasOwn(p, 'version')));
});

test('admin writes require a valid cookie and same origin, login fails closed and is rate-limited', async () => {
  const { call, env } = setup();
  assert.equal((await call('/api/admin/projects')).status, 401);
  assert.equal((await call('/api/admin/projects', { method: 'POST', json: {} })).status, 401);
  assert.equal((await call('/api/admin/login', { method: 'POST', json: { password: env.ADMIN_PASSWORD }, headers: { Origin: 'https://other.test' } })).status, 403);
  assert.equal((await call('/api/admin/login', { method: 'POST', json: { password: 'wrong' } })).status, 401);
  assert.equal((await call('/api/admin/projects', { headers: { Cookie: 'yifeng_admin=1999999999.' + '0'.repeat(64) } })).status, 401);
  env.LOGIN_LIMIT.limit = async () => ({ success: false });
  assert.equal((await call('/api/admin/login', { method: 'POST', json: { password: env.ADMIN_PASSWORD } })).status, 429);
  delete env.ADMIN_PASSWORD;
  assert.equal((await call('/api/admin/login', { method: 'POST', json: { password: 'any' } })).status, 503);
});

test('draft photo upload, publication, metadata edit, unpublish and cleanup use D1 and R2', async () => {
  const { call, env, photos } = setup();
  const session = await call('/api/admin/login', { method: 'POST', json: { password: env.ADMIN_PASSWORD } });
  assert.equal(session.status, 200);
  const cookie = session.headers.get('Set-Cookie');
  assert.match(cookie, /HttpOnly; SameSite=Strict; Secure/);
  const headers = { Cookie: cookie.split(';')[0] };
  const make = await call('/api/admin/projects', {
    method: 'POST', headers, json: { category: 'building', title: '驗證案場', published: false, sortOrder: 15 },
  });
  assert.equal(make.status, 201);
  const created = await make.json();
  const path = '/api/admin/projects/' + created.id;
  const uploadHeaders = { ...headers, 'X-Project-Version': String(created.version), 'Content-Type': 'image/png' };
  assert.equal((await call(path + '/photos', { method: 'POST', headers: uploadHeaders, body: Buffer.from('<script>fake</script>') })).status, 415);
  assert.equal((await call(path + '/photos', { method: 'POST', headers: uploadHeaders, body: Buffer.alloc(5 * 1024 * 1024 + 1) })).status, 413);
  const upload = await call(path + '/photos', { method: 'POST', headers: uploadHeaders, body: png });
  assert.equal(upload.status, 201);
  const withImage = await upload.json();
  const photo = withImage.images[0];
  assert.ok(photos.has(photo.id));
  const media = '/media/' + photo.id;
  const preview = '/api/admin/photos/' + photo.id;
  assert.equal((await call(media)).status, 404);
  assert.equal((await call(preview)).status, 401);
  assert.equal((await call(preview, { headers })).status, 200);
  const update = (json) => call(path, { method: 'PUT', headers, json });
  assert.equal((await update({ ...created, published: true })).status, 409);
  assert.equal((await update({ ...withImage, images: [{ id: 'different', alt: '' }] })).status, 400);
  const published = await (await update({ ...withImage, published: true, images: [{ ...photo, alt: '工地照片' }] })).json();
  const catalog = await (await call('/api/projects')).json();
  assert.equal(catalog.projects.find((p) => p.id === created.id).images[0].alt, '工地照片');
  const image = await call(media);
  assert.equal(image.headers.get('Content-Type'), 'image/png');
  assert.deepEqual(Buffer.from(await image.arrayBuffer()), png);
  const draft = await (await update({ ...published, published: false })).json();
  assert.equal((await call(media)).status, 404);
  assert.ok(!(await (await call('/api/projects')).json()).projects.find((p) => p.id === created.id));
  assert.equal((await update({ ...draft, images: [] })).status, 200);
  assert.ok(!photos.has(photo.id));
});
