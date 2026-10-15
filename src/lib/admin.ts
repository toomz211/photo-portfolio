/**
 * 管理员鉴权（站点编辑权限）
 *
 * 说明：本站在 GitHub Pages 纯静态托管，无后端，口令只能在前端做"轻量门禁"，
 * 防止普通访客随手改动排序/删除；源码与打包产物可被查看，无法做到真正的安全。
 * 如需绝对安全，需引入后端认证（成本高，对作品集场景不必要）。
 *
 * 修改口令：改下方 PASSWORD_ENCODED 即可。编码方式为简单的 Base64 + 字符偏移混淆，
 * 仅用于增加一点查看门槛，不代表加密。
 */

/** 默认口令：XuYuHao@2026（可在下方自定义后重新构建） */
const PASSWORD_ENCODED = 'W3ZadktibEMxMzE1';
const AUTH_KEY = 'portfolio.admin.v1';

function decodePassword(): string {
  try {
    const b64 = atob(PASSWORD_ENCODED);
    return b64
      .split('')
      .map((c) => String.fromCharCode(c.charCodeAt(0) ^ 3))
      .join('');
  } catch {
    return '';
  }
}

/** 当前会话是否已通过管理员验证 */
export function isAdmin(): boolean {
  try {
    return sessionStorage.getItem(AUTH_KEY) === '1';
  } catch {
    return false;
  }
}

/** 校验口令；通过后记录到会话（刷新页面仍保持，关闭标签页失效） */
export function tryLogin(password: string): boolean {
  if (password === decodePassword()) {
    try {
      sessionStorage.setItem(AUTH_KEY, '1');
    } catch {
      /* ignore */
    }
    return true;
  }
  return false;
}

/** 退出管理（清除会话授权） */
export function logout(): void {
  try {
    sessionStorage.removeItem(AUTH_KEY);
  } catch {
    /* ignore */
  }
}

/** 是否通过 URL ?admin=1 显式请求管理入口（普通访客不带该参数则完全不可见） */
export function wantsAdmin(): boolean {
  try {
    return new URLSearchParams(window.location.search).get('admin') === '1';
  } catch {
    return false;
  }
}
