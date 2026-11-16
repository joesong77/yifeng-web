const SUPPORTED = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_LONG_EDGE = 1920;
const MAX_INPUT = 25 * 1024 * 1024;
const MAX_UPLOAD = 5 * 1024 * 1024;

export async function compressPhoto(file) {
  if (!SUPPORTED.includes(file.type)) throw new Error('只支援 JPG、PNG、WebP 格式');
  if (file.size > MAX_INPUT) throw new Error('原始照片不可超過 25 MB');
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.src = url;
    await img.decode().catch(() => { throw new Error('無法讀取此照片'); });
    const ratio = Math.min(1, MAX_LONG_EDGE / Math.max(img.naturalWidth, img.naturalHeight));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(img.naturalWidth * ratio));
    canvas.height = Math.max(1, Math.round(img.naturalHeight * ratio));
    const context = canvas.getContext('2d');
    if (!context) throw new Error('無法壓縮此照片');
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
    const blobFor = (type) => new Promise((resolve) => canvas.toBlob(resolve, type, 0.82));
    let blob = await blobFor('image/webp');
    if (blob?.type !== 'image/webp') {
      context.globalCompositeOperation = 'destination-over';
      context.fillStyle = '#fff';
      context.fillRect(0, 0, canvas.width, canvas.height);
      blob = await blobFor('image/jpeg');
    }
    if (!blob || !SUPPORTED.includes(blob.type) || blob.size > MAX_UPLOAD) throw new Error('圖片壓縮後仍超過 5 MB 或無法轉檔');
    return blob;
  } finally { URL.revokeObjectURL(url); }
}
