# 逸峰營造工程實績管理平台

Netlify 繼續部署官網（React）。Cloudflare Workers 顯示獨立的 React 管理後台、提供公開查詢及圖片讀取。D1 存工程資料與圖片清單，R2 存新照片。訪客不需要登入，也無法呼叫後台讀寫 API。

## 部署順序

需要 Node.js 22 以上、Cloudflare Workers／D1／R2 操作權限及 Netlify 專案的環境變數設定權限。若帳號尚未啟用 R2，先在 Cloudflare 控制台啟用。

```sh
cd cloudflare
npm ci
npx wrangler login
npx wrangler d1 create yifeng-projects
npx wrangler r2 bucket create yifeng-project-photos
```

將建立資料庫時輸出的 `database_id` 填入 `cloudflare/wrangler.jsonc`，替換全零的值。若已建立同名資源，使用既有 ID 和 Bucket 名稱即可。R2 不需要開放公開儲存桶，請維持關閉 `r2.dev` 和 Bucket 的自訂網域。確認 `PUBLIC_SITE_URL` 指向自己的官網。

```sh
npx wrangler d1 migrations apply yifeng-projects --remote
npm run deploy
npx wrangler secret put ADMIN_PASSWORD
```

輸入至少 16 字元的專用高強度密碼，不要把密碼寫入設定檔或 commit。後台在部署成功後顯示的 Workers 網址根目錄，登入 Cookie 最長有效 8 小時。若需立即讓所有既有登入失效，輪替 `ADMIN_PASSWORD`。

先確認 Workers 的 `/api/projects` 已回傳既有案場，再到 Netlify 的環境變數加入 `REACT_APP_PROJECTS_API_URL`，設為 Wrangler 顯示的 Worker 基底網址（不帶路徑），並重新部署官網。React 在 build 階段讀取這個值。Netlify 的預覽與正式環境可各自設定。完成後打開官網的 `/construction` 並核對既有案場。

## 操作

1. 管理員可搜尋或依原本八個分類查看案場，也可新增案場。新增預設為草稿。
2. 先儲存案場，再多選照片上傳。後台會把長邊縮到至多 1,920 px，並壓成 WebP（瀏覽器不支援時改 JPG）。支援 JPG、PNG、WebP 原檔，不直接接受 HEIC。原始圖檔每張最多 25 MB，傳到 R2 的檔案每張最多 5 MB。
3. 可調整照片順序、替代文字或移除照片，按「儲存案場」套用；第一張就是官網相簿的第一張。勾選「在官網公開」並儲存後，訪客重新整理即可看到。不公開的 R2 照片只能在後台預覽。
4. 原本的案場、分類、順序與相片替代文字由 D1 migration 匯入。既有相片沿用目前官網已部署的圖片，因此不用重傳。後台的新相片才存入 R2。既有相片可調整順序及移出官網頁面，但其檔案仍可能可由舊靜態網址讀到，請勿把它們視為私有檔案。
5. 尚未設定 API 網址的 Netlify 版本維持靜態實績。已接 API 後，若服務不可用會提示重試，不會用舊資料把已下架案場重新顯示。

## 本機驗證

在 `cloudflare/` 執行以下指令，使用本機 D1 與 R2，不影響正式資料。

```sh
npm ci
cp .dev.vars.example .dev.vars
# 編輯 .dev.vars，填入自己的測試用管理密碼
npx wrangler d1 migrations apply yifeng-projects --local
npm test
npm run dev
```

後台預設在 `http://127.0.0.1:8787`。另從儲存庫根目錄啟動前台，將 `REACT_APP_PROJECTS_API_URL` 設為本機 Worker 網址即可測試。若既有 CRA lockfile 在 npm 11 無法直接 `npm ci`，使用 `npm ci --legacy-peer-deps`。

不要重排 `legacyProjects.js` 裡既有案場或相片的位置，首次匯入使用了位置來產生固定 ID。上線後請使用後台管理資料，不要重跑種子檔產生器來覆蓋 migration。
