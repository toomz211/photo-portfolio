/**
 * 静态资源路径工具
 * 统一通过 MIAODA_CLIENT_BASE_PATH 归一化后拼接相对路径，
 * 禁止裸根路径与 CDN 直引。
 */
const base: string = import.meta.env.MIAODA_CLIENT_BASE_PATH ?? '/';
const normalizedBase: string = base.endsWith('/') ? base : `${base}/`;

/** 把 public 下的相对资源路径转为带部署基路径的绝对地址 */
export function asset(path: string): string {
  const clean = path.replace(/^\/+/, '');
  return `${normalizedBase}${clean}`;
}

/** WebP 多档图片：images/xx.jpg -> images/webp/xx-<size>.webp */
export function webpSrc(path: string, size: 3200 | 1600 | 800): string {
  const clean = path.replace(/^\/+/, '').replace(/\.(jpe?g|png|webp)$/i, '');
  const idx = clean.lastIndexOf('/');
  const dir = idx >= 0 ? clean.slice(0, idx) : '';
  const name = clean.slice(idx + 1);
  const target = dir ? `${dir}/webp/${name}` : `webp/${name}`;
  return `${normalizedBase}${target}-${size}.webp`;
}

/** 生成响应式 srcset（800w / 1600w / 3200w） */
export function srcSetFor(path: string): string {
  return [800, 1600, 3200]
    .map((s) => `${webpSrc(path, s as 3200 | 1600 | 800)} ${s}w`)
    .join(', ');
}

/** 作品图常见的展示尺寸提示（栅格卡片） */
export const GALLERY_SIZES = '(max-width: 640px) 92vw, (max-width: 1024px) 44vw, 22vw';
