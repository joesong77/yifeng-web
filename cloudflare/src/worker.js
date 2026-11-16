import { categories } from './categories.js';

const validUuid = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/;
const validProjectId = /^(?:[a-f0-9-]{36}|legacy-[a-z]+-[1-9]\d*)$/;
const MAX_PHOTO = 5 * 1024 * 1024;
const MAX_PHOTOS = 100;
const SESSION_SECONDS = 8 * 60 * 60;
const COOKIE = 'yifeng_admin';
const encoder = new TextEncoder();
const decoder = new TextDecoder();
const json = (data, status = 200, extra = {}) => Response.json(data, {
  status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...extra },
});
class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
const problem = (status, message) => { throw new HttpError(status, message); };

async function readBytes(request, limit) {
  if (Number(request.headers.get('Content-Length')) > limit) problem(413, '上傳內容超過大小上限');
  if (!request.body) return new Uint8Array();
  const reader = request.body.getReader();
  const chunks = [];
  let length = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    length += value.length;
    if (length > limit) {
      await reader.cancel();
      problem(413, '上傳內容超過大小上限');
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  return bytes;
}

async function readJson(request, limit = 65536) {
  if (request.headers.get('Content-Type')?.split(';')[0] !== 'application/json') problem(415, '請使用 JSON 格式');
  const bytes = await readBytes(request, limit);
  try {
    const value = JSON.parse(decoder.decode(bytes));
    if (value && typeof value === 'object' && !Array.isArray(value)) return value;
  } catch { /* return the same error for invalid bodies */ }
  problem(400, 'JSON 格式錯誤');
}

async function sign(secret, value) {
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const bytes = new Uint8Array(await crypto.subtle.sign('HMAC', key, encoder.encode(value)));
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function equalSignature(a, b) {
  if (a.length !== b.length) return false;
  let difference = 0;
  for (let i = 0; i < a.length; i++) difference |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return difference === 0;
}

async function isAdmin(request, env) {
  const value = request.headers.get('Cookie')?.match(/(?:^|;\s*)yifeng_admin=([^;]+)/)?.[1];
  if (!env.ADMIN_PASSWORD || !/^\d{10}\.[a-f0-9]{64}$/.test(value ?? '')) return false;
  const [expires, signature] = value.split('.');
  return Number(expires) > Date.now() / 1000 &&
    equalSignature(signature, await sign(env.ADMIN_PASSWORD, `session:${expires}`));
}

function sessionCookie(request, token, maxAge) {
  const secure = new URL(request.url).protocol === 'https:' ? '; Secure' : '';
  return `${COOKIE}=${token}; Path=/; Max-Age=${maxAge}; HttpOnly; SameSite=Strict${secure}`;
}

function projectFrom(row) {
  return { id: row.id, category: row.category, title: row.title, subtitle: row.subtitle,
    images: JSON.parse(row.images_json), published: Boolean(row.published), sortOrder: row.sort_order, version: row.version };
}

async function readProject(env, id) {
  if (!validProjectId.test(id)) problem(404, '找不到案場');
  const row = await env.DB.prepare('SELECT * FROM projects WHERE id = ?').bind(id).first();
  if (!row) problem(404, '找不到案場');
  return projectFrom(row);
}

function publicWebsite(env) {
  try {
    const site = new URL(env.PUBLIC_SITE_URL);
    if (site.protocol === 'https:' || (site.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(site.hostname))) return site.origin;
  } catch { /* configurable preview link only */ }
  return '';
}

function details(body) {
  const { category, title, subtitle = '', published, sortOrder } = body;
  if (!Object.hasOwn(categories, category)) problem(400, '請選擇有效的工程分類');
  if (typeof title !== 'string' || !title.trim() || title.trim().length > 250) problem(400, '案場名稱需為 1 至 250 字');
  if (typeof subtitle !== 'string' || subtitle.length > 2000) problem(400, '補充說明上限為 2,000 字');
  if (typeof published !== 'boolean' || !Number.isSafeInteger(sortOrder) || sortOrder < 0 || sortOrder > 99999) problem(400, '請確認公開狀態及排序');
  return [category, title.trim(), subtitle.trim(), Number(published), sortOrder];
}

function checkVersion(version, project) {
  if (version !== project.version) problem(409, '資料已被更新，請重新開啟案場後再試');
}

function imagesFrom(body, existing) {
  if (!Array.isArray(body.images) || body.images.length > MAX_PHOTOS) problem(400, '圖片清單無效');
  const byId = new Map(existing.map((image) => [image.id, image]));
  const seen = new Set();
  return body.images.map((item) => {
    const original = byId.get(item?.id);
    if (!original || seen.has(item.id) || typeof item.alt !== 'string' ||
      (item.alt.length > 250 && item.alt !== original.alt)) problem(400, '圖片或替代文字無效');
    seen.add(item.id);
    return { ...original, alt: item.alt.trim() };
  });
}

function detectImage(bytes) {
  const ascii = (offset, length) => decoder.decode(bytes.subarray(offset, offset + length));
  if (bytes.length < 16) return null;
  if (bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) return 'image/jpeg';
  if ([137, 80, 78, 71, 13, 10, 26, 10].every((byte, i) => bytes[i] === byte) && ascii(12, 4) === 'IHDR') return 'image/png';
  if (ascii(0, 4) === 'RIFF' && ascii(8, 4) === 'WEBP' && ['VP8 ', 'VP8L', 'VP8X'].includes(ascii(12, 4))) return 'image/webp';
  return null;
}

async function updateProject(request, env, project, ctx) {
  const body = await readJson(request);
  checkVersion(body.version, project);
  const images = imagesFrom(body, project.images);
  const result = await env.DB.prepare(
    'UPDATE projects SET category=?, title=?, subtitle=?, published=?, sort_order=?, images_json=?, version=version+1 WHERE id=? AND version=?',
  ).bind(...details(body), JSON.stringify(images), project.id, project.version).run();
  if (result.meta.changes !== 1) checkVersion(-1, project);
  const kept = new Set(images.map(({ id }) => id));
  const removed = project.images.filter((item) => item.source === 'r2' && !kept.has(item.id)).map(({ id }) => id);
  if (removed.length) ctx.waitUntil(env.PHOTOS.delete(removed).catch((error) => console.error('R2 photo cleanup failed', error)));
  return json(await readProject(env, project.id));
}

async function uploadPhoto(request, env, project) {
  checkVersion(Number(request.headers.get('X-Project-Version')), project);
  if (project.images.length >= MAX_PHOTOS) problem(400, '此案場已達 100 張圖片上限');
  const bytes = await readBytes(request, MAX_PHOTO);
  const contentType = detectImage(bytes);
  if (!contentType || request.headers.get('Content-Type') !== contentType) problem(415, '僅接受 JPG、PNG 或 WebP 圖片');
  const id = crypto.randomUUID();
  await env.PHOTOS.put(id, bytes, { httpMetadata: { contentType } });
  try {
    const result = await env.DB.prepare(
      'UPDATE projects SET images_json=?, version=version+1 WHERE id=? AND version=?',
    ).bind(JSON.stringify([...project.images, { source: 'r2', id, alt: '' }]), project.id, project.version).run();
    if (result.meta.changes !== 1) checkVersion(-1, project);
  } catch (error) {
    // A lost DB response may have committed the reference. Never remove a possibly referenced object.
    if (error instanceof HttpError) await env.PHOTOS.delete(id).catch(() => {});
    throw error;
  }
  return json(await readProject(env, project.id), 201);
}

async function readPhoto(request, env, id, isPreview) {
  if (!validUuid.test(id)) problem(404, '找不到圖片');
  if (isPreview && !await isAdmin(request, env)) problem(401, '請先登入');
  const visible = await env.DB.prepare(
    `SELECT 1 AS found FROM projects p, json_each(p.images_json) image
     WHERE (? = 1 OR p.published = 1)
       AND json_extract(image.value, '$.source') = 'r2'
       AND json_extract(image.value, '$.id') = ? LIMIT 1`,
  ).bind(Number(isPreview), id).first();
  if (!visible) problem(404, '找不到圖片');
  const object = await env.PHOTOS.get(id);
  if (!object) problem(404, '找不到圖片');
  const headers = new Headers({
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'Content-Security-Policy': "default-src 'none'; sandbox",
  });
  object.writeHttpMetadata(headers);
  headers.set('Cache-Control', 'no-store');
  return new Response(object.body, { headers });
}

async function route(request, env, ctx) {
  const { pathname, origin } = new URL(request.url);
  const method = request.method;
  if (pathname === '/api/projects' && method === 'GET') {
    const { results } = await env.DB.prepare('SELECT * FROM projects WHERE published = 1 ORDER BY category, sort_order, id').all();
    const projects = results.map((row) => {
      const { id, category, title, subtitle, images } = projectFrom(row);
      return { id, category, title, subtitle, images };
    });
    return json({ schemaVersion: 1, projects }, 200, { 'Access-Control-Allow-Origin': '*' });
  }

  const media = pathname.match(/^\/media\/([^/]+)$/);
  if (media && method === 'GET') return readPhoto(request, env, media[1], false);

  if (pathname.startsWith('/api/admin/')) {
    if (!['GET', 'HEAD'].includes(method) && request.headers.get('Origin') !== origin) problem(403, '操作來源不符');
    if (pathname === '/api/admin/login' && method === 'POST') {
      if (!env.ADMIN_PASSWORD || env.ADMIN_PASSWORD.length < 16) problem(503, '後台登入尚未設定，密碼至少 16 字元');
      const { success } = await env.LOGIN_LIMIT.limit({ key: request.headers.get('CF-Connecting-IP') || 'local' });
      if (!success) problem(429, '嘗試次數過多，請稍後再試');
      const { password } = await readJson(request, 2048);
      if (typeof password !== 'string' ||
        !equalSignature(await sign(env.ADMIN_PASSWORD, `login:${password}`), await sign(env.ADMIN_PASSWORD, `login:${env.ADMIN_PASSWORD}`))) {
        problem(401, '密碼不正確');
      }
      const expires = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
      const token = `${expires}.${await sign(env.ADMIN_PASSWORD, `session:${expires}`)}`;
      return json({ ok: true }, 200, { 'Set-Cookie': sessionCookie(request, token, SESSION_SECONDS) });
    }
    if (pathname === '/api/admin/logout' && method === 'POST') {
      return json({ ok: true }, 200, { 'Set-Cookie': sessionCookie(request, '', 0) });
    }
    if (pathname === '/api/admin/session' && method === 'GET') return json({ signedIn: await isAdmin(request, env) });
    if (!await isAdmin(request, env)) problem(401, '請先登入');

    if (pathname === '/api/admin/projects' && method === 'GET') {
      const { results } = await env.DB.prepare('SELECT * FROM projects ORDER BY category, sort_order, id').all();
      return json({ projects: results.map(projectFrom), publicSite: publicWebsite(env) });
    }

    if (pathname === '/api/admin/projects' && method === 'POST') {
      const body = await readJson(request);
      const id = crypto.randomUUID();
      await env.DB.prepare('INSERT INTO projects (id, category, title, subtitle, published, sort_order) VALUES (?, ?, ?, ?, ?, ?)')
        .bind(id, ...details(body)).run();
      return json(await readProject(env, id), 201);
    }

    const project = pathname.match(/^\/api\/admin\/projects\/([^/]+)(\/photos)?$/);
    if (project && method === 'PUT' && !project[2]) return updateProject(request, env, await readProject(env, project[1]), ctx);
    if (project && method === 'POST' && project[2]) return uploadPhoto(request, env, await readProject(env, project[1]));
    const preview = pathname.match(/^\/api\/admin\/photos\/([^/]+)$/);
    if (preview && method === 'GET') return readPhoto(request, env, preview[1], true);
  }

  if (pathname.startsWith('/api/') || pathname.startsWith('/media/')) problem(404, '找不到此頁');
  if (pathname === '/admin' || pathname === '/admin/') return Response.redirect(new URL('/', request.url), 302);
  const response = await env.ASSETS.fetch(request);
  const headers = new Headers(response.headers);
  headers.set('Content-Security-Policy', "default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' blob:; connect-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'");
  headers.set('X-Content-Type-Options', 'nosniff');
  return new Response(response.body, { status: response.status, headers });
}

export default {
  async fetch(request, env, ctx) {
    try {
      return await route(request, env, ctx);
    } catch (error) {
      if (error instanceof HttpError) return json({ error: error.message }, error.status);
      console.error('Request failed', error);
      return json({ error: '伺服器暫時無法處理，請稍後再試' }, 500);
    }
  },
};
