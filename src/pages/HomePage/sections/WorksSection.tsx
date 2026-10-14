import { useMemo, useState } from 'react';
import { Reorder } from 'framer-motion';
import { GripVertical, X, ZoomIn } from 'lucide-react';
import { asset } from '@/lib/paths';
import { PHOTO_WORKS } from '@/data/profile';
import SectionHeader from '@/pages/HomePage/sections/SectionHeader';
import Lightbox from '@/pages/HomePage/sections/Lightbox';
import GalleryEditorBar from '@/components/GalleryEditorBar';
import { Stagger, StaggerItem } from '@/components/Reveal';
import { useEditableGallery } from '@/lib/useEditableGallery';

export interface WorksSectionProps {
  id: string;
}

const TAGS = [
  '全部',
  '人像写真',
  '生活随拍',
  '旅拍人像',
  '夜景人像',
  'Cosplay',
  '日常写真',
  '古风旗袍',
  '时尚创作',
  '婚礼跟拍',
  '舞台民族',
];

export default function WorksSection({ id }: WorksSectionProps) {
  const gallery = useEditableGallery(PHOTO_WORKS, 'portfolio.photo');
  const { visible, editing, setEditing, remove, reorder, save, reset, removedCount, hasChanges } =
    gallery;

  const [activeTag, setActiveTag] = useState('全部');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // 展示模式：按分类筛选；编辑模式：操作全量
  const shown = useMemo(
    () => (editing ? visible : visible.filter((w) => activeTag === '全部' || w.tag === activeTag)),
    [visible, activeTag, editing],
  );

  return (
    <section id={id} className="scroll-mt-16 bg-muted/40 py-24">
      <div className="mx-auto w-full max-w-[1680px] px-6 lg:px-10">
        <SectionHeader
          index="02"
          en="Photography Works"
          title="摄影作品"
          desc="人像写真、婚礼跟拍、古风旗袍、舞台纪实与夜景人像——100 张真实作品，每一帧都是真实的现场与真实的情绪。"
        />

        {/* 工具栏：编辑 / 保存 / 恢复 */}
        <GalleryEditorBar
          editing={editing}
          removedCount={removedCount}
          totalCount={PHOTO_WORKS.length}
          onToggle={() => {
            setEditing(!editing);
            setLightboxIndex(null);
          }}
          onSave={save}
          onReset={reset}
          hasLocalChanges={hasChanges}
        />

        {/* 分类筛选（仅展示模式） */}
        {!editing && (
          <Stagger className="mb-10 flex flex-wrap gap-3">
            {TAGS.map((tag) => {
              const count =
                tag === '全部'
                  ? visible.length
                  : visible.filter((w) => w.tag === tag).length;
              return (
                <StaggerItem key={tag}>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTag(tag);
                      setLightboxIndex(null);
                    }}
                    className={
                      activeTag === tag
                        ? 'cursor-pointer rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-sm'
                        : 'cursor-pointer rounded-full border border-border bg-white px-5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary'
                    }
                  >
                    {tag}
                    <span className="ml-1.5 text-xs opacity-70">{count}</span>
                  </button>
                </StaggerItem>
              );
            })}
          </Stagger>
        )}

        {/* 展示模式：错落瀑布流 */}
        {!editing && (
          <Stagger className="columns-2 gap-5 md:columns-3 lg:columns-4">
            {shown.map((work) => (
              <StaggerItem key={work.src} className="mb-5 break-inside-avoid">
                <button
                  type="button"
                  onClick={() => setLightboxIndex(shown.indexOf(work))}
                  className="group block w-full cursor-pointer overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={asset(work.src)}
                      alt={work.title}
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-left opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="text-sm font-bold text-white">{work.title}</p>
                      <span className="mt-1 inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-xs text-white backdrop-blur-sm">
                        {work.tag}
                      </span>
                    </div>
                    <span className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                      <ZoomIn className="size-4" />
                    </span>
                  </div>
                </button>
              </StaggerItem>
            ))}
          </Stagger>
        )}

        {/* 编辑模式：可拖拽排序 + 删除 */}
        {editing && (
          <Reorder.Group
            axis="y"
            values={visible}
            onReorder={reorder}
            className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
          >
            {visible.map((work) => (
              <Reorder.Item
                key={work.src}
                value={work}
                whileDrag={{ scale: 1.04, zIndex: 30, boxShadow: '0 20px 40px rgba(0,0,0,0.18)' }}
                className="group relative cursor-grab overflow-hidden rounded-2xl border-2 border-dashed border-primary/30 bg-white shadow-sm active:cursor-grabbing"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={asset(work.src)}
                    alt={work.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                  {/* 删除按钮 */}
                  <button
                    type="button"
                    onClick={() => remove(work.src)}
                    aria-label={`删除 ${work.title}`}
                    className="absolute right-2 top-2 grid size-8 cursor-pointer place-items-center rounded-full bg-red-500/90 text-white shadow-md transition-transform hover:scale-110"
                  >
                    <X className="size-4" />
                  </button>
                  {/* 拖拽提示 */}
                  <span className="absolute left-2 top-2 grid size-7 place-items-center rounded-full bg-white/80 text-primary shadow-sm backdrop-blur-sm">
                    <GripVertical className="size-4" />
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 px-3 py-2.5">
                  <p className="truncate text-xs font-bold">{work.title}</p>
                  <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                    {work.tag}
                  </span>
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        )}
      </div>

      {/* 灯箱 */}
      <Lightbox
        items={shown}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() =>
          setLightboxIndex((p) => (p === null ? p : (p + shown.length - 1) % shown.length))
        }
        onNext={() =>
          setLightboxIndex((p) => (p === null ? p : (p + 1) % shown.length))
        }
      />
    </section>
  );
}
