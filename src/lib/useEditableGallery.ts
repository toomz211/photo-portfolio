import { useCallback, useMemo, useState } from 'react';

export interface GalleryItem {
  src: string;
}

interface GalleryState<T extends GalleryItem> {
  /** 当前展示的列表（已应用删除与排序） */
  visible: T[];
  /** 是否处于编辑模式 */
  editing: boolean;
  setEditing: (v: boolean) => void;
  /** 删除一张图（编辑模式） */
  remove: (src: string) => void;
  /** 拖拽后的新顺序（编辑模式） */
  reorder: (next: T[]) => void;
  /** 保存排序与删除结果到本地 */
  save: () => void;
  /** 恢复默认顺序与全部作品 */
  reset: () => void;
  /** 当前被删除的数量 */
  removedCount: number;
  /** 是否有未持久化/已持久化的本地调整 */
  hasChanges: boolean;
}

/**
 * 可编辑作品画廊：拖拽排序 + 删除，localStorage 持久化。
 * storageKey 每个板块独立（如 portfolio.photo / portfolio.ai）。
 */
export function useEditableGallery<T extends GalleryItem>(
  items: T[],
  storageKey: string,
): GalleryState<T> {
  const [editing, setEditing] = useState(false);
  const [ordered, setOrdered] = useState<T[] | null>(() => {
    try {
      const raw = window.localStorage.getItem(`${storageKey}.order`);
      if (!raw) return null;
      const o = JSON.parse(raw);
      return Array.isArray(o) && o.length > 0 ? o : null;
    } catch {
      return null;
    }
  });
  const [hidden, setHidden] = useState<string[]>(() => {
    try {
      const raw = window.localStorage.getItem(`${storageKey}.hidden`);
      if (!raw) return [];
      const h = JSON.parse(raw);
      return Array.isArray(h) ? h : [];
    } catch {
      return [];
    }
  });

  const visible = useMemo(() => {
    const base = ordered && ordered.length === items.length ? ordered : items;
    return base.filter((it) => !hidden.includes(it.src));
  }, [items, ordered, hidden]);

  const remove = useCallback((src: string) => {
    setHidden((h) => (h.includes(src) ? h : [...h, src]));
  }, []);

  const reorder = useCallback((next: T[]) => {
    setOrdered(next);
  }, []);

  const save = useCallback(() => {
    try {
      if (ordered && ordered.length > 0) {
        window.localStorage.setItem(`${storageKey}.order`, JSON.stringify(ordered));
      }
      window.localStorage.setItem(`${storageKey}.hidden`, JSON.stringify(hidden));
    } catch {
      /* localStorage 不可用时静默忽略 */
    }
    setEditing(false);
  }, [ordered, hidden, storageKey]);

  const reset = useCallback(() => {
    try {
      window.localStorage.removeItem(`${storageKey}.order`);
      window.localStorage.removeItem(`${storageKey}.hidden`);
    } catch {
      /* ignore */
    }
    setOrdered(null);
    setHidden([]);
    setEditing(false);
  }, [storageKey]);

  return {
    visible,
    editing,
    setEditing,
    remove,
    reorder,
    save,
    reset,
    removedCount: hidden.length,
    hasChanges: hidden.length > 0 || ordered !== null,
  };
}
