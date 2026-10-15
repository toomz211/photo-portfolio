import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Pencil, Check, RotateCcw, X, Lock, LogOut } from 'lucide-react';
import { isAdmin, tryLogin, logout, wantsAdmin } from '@/lib/admin';

interface GalleryEditorBarProps {
  editing: boolean;
  removedCount: number;
  totalCount: number;
  onToggle: () => void;
  onSave: () => void;
  onReset: () => void;
  hasLocalChanges: boolean;
}

/** 图片板块顶部工具栏：进入编辑模式 / 保存 / 恢复默认（仅站长可用，需 ?admin=1 + 口令） */
export default function GalleryEditorBar({
  editing,
  removedCount,
  totalCount,
  onToggle,
  onSave,
  onReset,
  hasLocalChanges,
}: GalleryEditorBarProps) {
  const [admin, setAdmin] = useState(isAdmin());
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);

  // 仅当 URL 带 ?admin=1 时显示登录入口；普通访客完全看不到任何编辑 UI
  const showLogin = useMemo(() => !admin && wantsAdmin(), [admin]);

  const submitLogin = () => {
    if (tryLogin(pw)) {
      setAdmin(true);
      setPw('');
      setError(false);
    } else {
      setError(true);
    }
  };

  // —— 未授权：默认不渲染任何内容 ——
  if (!admin) {
    if (!showLogin) return null;
    return (
      <div className="mb-10 flex flex-wrap items-center gap-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitLogin();
          }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 shadow-sm"
        >
          <Lock className="size-4 text-muted-foreground" />
          <input
            type="password"
            value={pw}
            onChange={(e) => {
              setPw(e.target.value);
              setError(false);
            }}
            placeholder="管理员口令"
            autoComplete="off"
            className="w-36 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            className="cursor-pointer rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-primary/90"
          >
            进入编辑
          </button>
        </form>
        {error && <span className="text-xs font-medium text-red-500">口令不正确</span>}
      </div>
    );
  }

  // —— 已授权：编辑入口 / 编辑模式工具栏 ——
  if (!editing) {
    return (
      <div className="mb-10 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onToggle}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-primary/30 bg-white px-5 py-2 text-sm font-semibold text-primary shadow-sm transition-all hover:bg-primary/5"
        >
          <Pencil className="size-4" />
          编辑排序 / 删除
        </button>
        {hasLocalChanges && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-warning/10 px-3.5 py-1.5 text-xs font-medium text-warning">
            <span className="size-1.5 rounded-full bg-warning" />
            有本地调整（{removedCount} 张已隐藏）
          </span>
        )}
        {hasLocalChanges && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border bg-white px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <RotateCcw className="size-3.5" />
            恢复默认
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            logout();
            setAdmin(false);
          }}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border bg-white px-3.5 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-red-500"
        >
          <LogOut className="size-3.5" />
          退出管理
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-10 flex flex-wrap items-center gap-4 rounded-2xl border border-primary/25 bg-primary/5 px-5 py-4"
    >
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-foreground">
          编辑模式 · 拖拽卡片调整顺序，点右上角「×」删除作品
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          当前共 {totalCount} 张，已隐藏 {removedCount} 张 · 排序与删除会保存在本机浏览器
        </p>
      </div>
      <button
        type="button"
        onClick={onSave}
        className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary/90"
      >
        <Check className="size-4" />
        完成并保存
      </button>
      <button
        type="button"
        onClick={onToggle}
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border bg-white px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <X className="size-3.5" />
        放弃修改
      </button>
    </motion.div>
  );
}
