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
