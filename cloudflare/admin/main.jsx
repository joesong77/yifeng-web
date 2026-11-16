import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { categories } from '../src/categories.js';
import { compressPhoto } from './photo.js';
import './styles.css';

const api = '/api/admin/';
async function request(path, options = {}) {
  const { json, ...init } = options;
  const response = await fetch(api + path, json === undefined ? init : {
    ...init, body: JSON.stringify(json), headers: { ...init.headers, 'Content-Type': 'application/json' },
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw Object.assign(new Error(result.error || '暫時無法連線，請稍後再試'), { status: response.status });
  return result;
}

const emptyProject = (category) => ({ category: category || 'building', title: '', subtitle: '', published: false, sortOrder: 10, images: [] });
const orderProjects = (a, b) => a.sortOrder - b.sortOrder || a.id.localeCompare(b.id);

function App() {
  const [signedIn, setSignedIn] = useState(null);
  const [projects, setProjects] = useState([]);
  const [publicSite, setPublicSite] = useState('');
  const [category, setCategory] = useState('');
  const [query, setQuery] = useState('');
  const [edit, setEdit] = useState(null);
  const [saved, setSaved] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [working, setWorking] = useState('');
  const [error, setError] = useState('');
  const [note, setNote] = useState('');

  const dirty = JSON.stringify(edit) !== JSON.stringify(saved);

  useEffect(() => {
    request('session').then(({ signedIn }) => setSignedIn(signedIn)).catch(() => {
      setSignedIn(false);
      setError('無法確認登入狀態，請稍後再試');
    });
  }, []);

  useEffect(() => {
    if (!signedIn) return;
    let active = true;
    request('projects').then((result) => {
      if (active) {
        setProjects(result.projects);
        setPublicSite(result.publicSite);
        setLoaded(true);
      }
    }).catch((err) => {
      if (active) {
        if (err.status === 401) setSignedIn(false);
        setError(err.message);
      }
    });
    return () => { active = false; };
  }, [signedIn]);

  useEffect(() => {
    if (!dirty && !working) return;
    const warn = (event) => { event.preventDefault(); event.returnValue = true; };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty, working]);

  function pick(project) {
    if (dirty && !window.confirm('放棄尚未儲存的變更？')) return;
    setEdit(project);
    setSaved(project);
    setError('');
    setNote('');
  }

  function updateLocal(project) {
    setProjects((list) => [...list.filter(({ id }) => id !== project.id), project]);
    setEdit(project);
    setSaved(project);
  }

  async function run(label, task) {
    setWorking(label);
    setError('');
    setNote('');
    try { await task(); }
    catch (err) {
      setError(err.message || '操作失敗，請稍後重試');
      if (err.status === 401 && signedIn) {
        setSignedIn(false);
        setLoaded(false);
        setProjects([]);
        setEdit(null);
        setSaved(null);
      }
    } finally { setWorking(''); }
  }

  function signIn(event) {
    event.preventDefault();
    const password = new FormData(event.currentTarget).get('password');
    run('登入中…', async () => {
      await request('login', { method: 'POST', json: { password } });
      setSignedIn(true);
    });
  }

  function signOut() {
    if (dirty && !window.confirm('尚有未儲存的變更，仍要登出嗎？')) return;
    run('登出中…', async () => {
      await request('logout', { method: 'POST' });
      setSignedIn(false);
      setLoaded(false);
      setProjects([]);
      setEdit(null);
      setSaved(null);
    });
  }

  function save(event) {
    event.preventDefault();
    if (saved?.images.some((old) => !edit.images.some(({ id }) => id === old.id)) &&
      !window.confirm('儲存後將從案場移除所選照片。確定要繼續嗎？')) return;
    run('儲存中…', async () => {
      const data = await request(edit.id ? `projects/${edit.id}` : 'projects', {
        method: edit.id ? 'PUT' : 'POST',
        json: edit,
      });
      updateLocal(data);
      setNote(data.published ? '已儲存，官網重新載入後可看到變更。' : '草稿已儲存，不會顯示在官網。');
    });
  }

  async function upload(event) {
    const files = [...event.currentTarget.files];
    event.currentTarget.value = '';
    if (!files.length) return;
    run('準備上傳…', async () => {
      let project = edit;
      for (const [i, file] of files.entries()) {
        setWorking(`處理照片 ${i + 1} / ${files.length}…`);
        try {
          const blob = await compressPhoto(file);
          project = await request(`projects/${project.id}/photos`, {
            method: 'POST', body: blob, headers: { 'Content-Type': blob.type, 'X-Project-Version': String(project.version) },
          });
          updateLocal(project);
        } catch (err) {
          throw Object.assign(new Error(`${file.name}：${err.message}${i ? `（已成功上傳 ${i} 張）` : ''}`), { status: err.status });
        }
      }
      setNote(`已上傳 ${files.length} 張照片。`);
    });
  }

  const setField = (key, value) => setEdit((project) => ({ ...project, [key]: value }));
  const changeImage = (index, alt) => setField('images', edit.images.map((image, i) => i === index ? { ...image, alt } : image));
  const moveImage = (index, direction) => {
    const images = [...edit.images];
    [images[index], images[index + direction]] = [images[index + direction], images[index]];
    setField('images', images);
  };

  const visible = projects.filter((p) => (!category || p.category === category) && p.title.toLowerCase().includes(query.trim().toLowerCase())).sort(orderProjects);

  return (
    <>
      <header className="top">
        <div className="top-inner">
          <div className="brand"><span className="brand-mark" aria-hidden="true">逸</span><span>逸峰營造 <small>工程實績管理</small></span></div>
          {signedIn && <div className="actions">
            {publicSite && <a href={publicSite + '/construction'} target="_blank" rel="noreferrer">查看官網實績 ↗</a>}
            <button className="outline" onClick={signOut} disabled={!!working}>登出</button>
          </div>}
        </div>
      </header>
      {signedIn === null ? <main className="page" aria-live="polite">正在確認登入狀態…</main> : !signedIn ? (
        <main className="page login">
          <form className="panel" onSubmit={signIn}>
            <p className="eyebrow">YIFENG CONSTRUCTION</p>
            <h1>管理員登入</h1>
            <p className="muted">管理工程實績與案場照片。</p>
            <label>管理密碼<input autoComplete="current-password" name="password" type="password" required /></label>
            <button className="primary" disabled={!!working}>{working || '登入'}</button>
            {error && <p className="error" role="alert">{error}</p>}
          </form>
        </main>
      ) : (
        <main className="page">
          <div className="hero">
            <div><p className="eyebrow">PROJECT PORTFOLIO</p><h1>工程實績</h1><p className="muted">新增案場、整理照片，並選擇要在官網展示的內容。</p></div>
            <button className="primary" disabled={!!working || !loaded} onClick={() => pick(emptyProject(category))}>＋ 新增案場</button>
          </div>
          <div aria-live="polite">{error && <p className="error" role="alert">{error}</p>}{note && <p className="notice">{note}</p>}{working && <p className="notice">{working}</p>}</div>
          <div className="layout">
            <section className="panel list" aria-label="案場清單">
              <div className="filters">
                <label>工程分類<select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="">全部分類</option>
                  {Object.entries(categories).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
                </select></label>
                <label>搜尋案場<input type="search" placeholder="輸入案場名稱" value={query} onChange={(e) => setQuery(e.target.value)} /></label>
              </div>
              <p className="muted">{loaded ? `共 ${visible.length} 筆` : error ? '清單載入失敗，請重新整理後再試。' : '正在載入案場…'}</p>
              <ul>
                {visible.map((p) => (
                  <li key={p.id}><button type="button" aria-pressed={edit?.id === p.id} disabled={!!working} onClick={() => pick(p)}>
                    <strong>{p.title}</strong>
                    <span className="meta">{categories[p.category]} · {p.images.length} 張</span>
                    <span className={p.published ? 'status live' : 'status'}>{p.published ? '公開' : '草稿'}</span>
                  </button></li>
                ))}
              </ul>
            </section>
            {!edit ? <section className="panel empty"><h2>選擇一個案場</h2><p className="muted">從清單選擇既有實績，或新增案場。</p></section> : (
              <form className="panel editor" onSubmit={save}>
                <h2>{edit.id ? '編輯案場' : '新增案場'}</h2>
                <fieldset disabled={!!working}>
                  <div className="two">
                    <label>工程分類<select value={edit.category} onChange={(e) => setField('category', e.target.value)}>
                      {Object.entries(categories).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
                    </select></label>
                    <label>顯示順序（越小越前）<input type="number" required min="0" max="99999" value={edit.sortOrder ?? ''} onChange={(e) => setField('sortOrder', e.target.value === '' ? null : e.target.valueAsNumber)} /></label>
                  </div>
                  <label>案場名稱<input required maxLength={250} value={edit.title} onChange={(e) => setField('title', e.target.value)} /></label>
                  <label>補充說明<textarea rows="3" maxLength={2000} value={edit.subtitle} onChange={(e) => setField('subtitle', e.target.value)} /></label>
                  <label className="check"><input type="checkbox" checked={edit.published} onChange={(e) => setField('published', e.target.checked)} />在官網公開</label>
                  <div className="editor-actions"><button className="primary">儲存案場</button>{dirty && <span className="muted">尚未儲存</span>}</div>
                  <hr />
                  <h3>案場照片</h3>
                  <p className="muted">JPG、PNG、WebP 可多選。照片在上傳前會縮小並壓縮為 WebP 或 JPG，每張上傳上限 5 MB。</p>
                  <label>選擇照片<input type="file" accept="image/jpeg,image/png,image/webp" multiple disabled={!edit.id || dirty} onChange={upload} /></label>
                  {(!edit.id || dirty) && <p className="muted">請先儲存案場資料，再上傳照片。</p>}
                  <ol className="photos">
                    {edit.images.map((image, index) => (
                      <li key={image.id}>
                        {image.source === 'r2' ? <img src={api + 'photos/' + image.id} alt={image.alt || `照片 ${index + 1}`} loading="lazy" /> : <div className="legacy"><span>既有官網照片</span>{publicSite && <a href={publicSite + '/construction'} target="_blank" rel="noreferrer">至官網查看 ↗</a>}</div>}
                        <div className="photo-fields">
                          <label>照片 {index + 1} 的替代文字<input value={image.alt} maxLength={250} onChange={(e) => changeImage(index, e.target.value)} /></label>
                          <div className="actions">
                            <button type="button" disabled={index === 0} onClick={() => moveImage(index, -1)}>往前</button>
                            <button type="button" disabled={index === edit.images.length - 1} onClick={() => moveImage(index, 1)}>往後</button>
                            <button className="danger" type="button" onClick={() => setField('images', edit.images.filter(({ id }) => id !== image.id))}>移除</button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                  {edit.images.length > 0 && <button className="primary">儲存案場與照片設定</button>}
                </fieldset>
              </form>
            )}
          </div>
        </main>
      )}
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
