import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { asset } from '@/lib/paths';

export interface LightboxItem {
  src: string;
  title: string;
}

export interface LightboxProps {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const open = index !== null && index >= 0 && index < items.length;

  // ESC 关闭 + 锁定背景滚动
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose, onPrev, onNext]);

  if (!open) return null;

  const item = items[index!];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-5 top-5 grid size-11 cursor-pointer place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        aria-label="关闭"
      >
        <X className="size-5" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 grid size-12 cursor-pointer place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 lg:left-8"
        aria-label="上一张"
      >
        <ChevronLeft className="size-6" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 grid size-12 cursor-pointer place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 lg:right-8"
        aria-label="下一张"
      >
        <ChevronRight className="size-6" />
      </button>

      <figure
        className="flex max-h-full max-w-5xl flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={asset(item.src)}
          alt={item.title}
          className="max-h-[78vh] w-auto rounded-xl object-contain shadow-2xl"
        />
        <figcaption className="text-center">
          <p className="text-lg font-bold text-white">{item.title}</p>
          <p className="text-sm text-white/60">
            {index! + 1} / {items.length}
          </p>
        </figcaption>
      </figure>
    </div>
  );
}
