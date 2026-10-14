import { useState } from 'react';
import { Reorder } from 'framer-motion';
import { GripVertical, Sparkles, X } from 'lucide-react';
import { webpSrc, srcSetFor, GALLERY_SIZES } from '@/lib/paths';
import { AI_WORKS } from '@/data/profile';
import SectionHeader from '@/pages/HomePage/sections/SectionHeader';
import GalleryEditorBar from '@/components/GalleryEditorBar';
import { Stagger, StaggerItem } from '@/components/Reveal';
import { useEditableGallery } from '@/lib/useEditableGallery';

export interface AiSectionProps {
  id: string;
}

const TAGS = ['全部', 'AI 人像', 'AI 实验', '电商产品'];

export default function AiSection({ id }: AiSectionProps) {
  const gallery = useEditableGallery(AI_WORKS, 'portfolio.ai');
  const { visible, editing, setEditing, remove, reorder, save, reset, removedCount, hasChanges } =
    gallery;
  const [activeTag, setActiveTag] = useState('全部');

  const shown = visible.filter((w) => editing || activeTag === '全部' || w.tag === activeTag);

  return (
    <section id={id} className="scroll-mt-16 bg-gradient-to-b from-background to-primary/5 py-24">
      <div className="mx-auto w-full max-w-[1680px] px-6 lg:px-10">
        <SectionHeader
          index="03"
          en="AI Creation"
          title="AI 图片创作"
          desc="通过 Krea、ComfyUI 等工具探索 AI 视觉边界——角色概念、工作流实验与 AI 电商产品视觉。"
        />

        <GalleryEditorBar
          editing={editing}
          removedCount={removedCount}
          totalCount={AI_WORKS.length}
          onToggle={() => setEditing(!editing)}
          onSave={save}
          onReset={reset}
          hasLocalChanges={hasChanges}
        />

        {/* 分类筛选（仅展示模式） */}
        {!editing && (
          <Stagger className="mb-10 flex flex-wrap gap-3">
            {TAGS.map((tag) => (
              <StaggerItem key={tag}>
                <button
                  type="button"
                  onClick={() => setActiveTag(tag)}
                  className={
                    activeTag === tag
                      ? 'cursor-pointer rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-sm'
                      : 'cursor-pointer rounded-full border border-border bg-white px-5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary'
                  }
                >
                  {tag}
                  <span className="ml-1.5 text-xs opacity-70">
                    {tag === '全部'
                      ? visible.length
                      : visible.filter((w) => w.tag === tag).length}
                  </span>
                </button>
              </StaggerItem>
            ))}
          </Stagger>
        )}

        {/* 展示模式：网格 */}
        {!editing && (
          <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {shown.map((work) => (
              <StaggerItem key={work.src}>
                <figure className="group relative overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="overflow-hidden">
                    <img
                      src={webpSrc(work.src, 1600)}
                      srcSet={srcSetFor(work.src)}
                      sizes={GALLERY_SIZES}
                      alt={work.title}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <figcaption className="flex items-center gap-3 p-4">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                      <Sparkles className="size-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold">{work.title}</p>
                      <p className="truncate text-xs text-muted-foreground">{work.desc}</p>
                    </div>
                    <span className="ml-auto shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                      {work.tag}
                    </span>
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        )}

        {/* 编辑模式：拖拽排序 + 删除 */}
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
                    src={webpSrc(work.src, 800)}
                    alt={work.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                  <button
                    type="button"
                    onClick={() => remove(work.src)}
                    aria-label={`删除 ${work.title}`}
                    className="absolute right-2 top-2 grid size-8 cursor-pointer place-items-center rounded-full bg-red-500/90 text-white shadow-md transition-transform hover:scale-110"
                  >
                    <X className="size-4" />
                  </button>
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
    </section>
  );
}
