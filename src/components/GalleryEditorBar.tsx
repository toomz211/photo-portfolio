import { motion } from 'framer-motion';
import { Pencil, Check, RotateCcw, X } from 'lucide-react';

interface GalleryEditorBarProps {
  editing: boolean;
  removedCount: number;
  totalCount: number;
  onToggle: () => void;
  onSave: () => void;
  onReset: () => void;
  hasLocalChanges: boolean;
}

/** 图片板块顶部工具栏：进入编辑模式 / 保存 / 恢复默认 */
export default function GalleryEditorBar({
  editing,
  removedCount,
  totalCount,
  onToggle,
  onSave,
  onReset,
  hasLocalChanges,
}: GalleryEditorBarProps) {
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
