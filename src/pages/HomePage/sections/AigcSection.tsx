import { useState } from 'react';
import { Reorder } from 'framer-motion';
import { GripVertical, Trophy, Palette, X } from 'lucide-react';
import { asset } from '@/lib/paths';
import { AIGC_WORKS } from '@/data/profile';
import SectionHeader from '@/pages/HomePage/sections/SectionHeader';
import GalleryEditorBar from '@/components/GalleryEditorBar';
import { Stagger, StaggerItem } from '@/components/Reveal';
import { useEditableGallery } from '@/lib/useEditableGallery';

export interface AigcSectionProps {
  id: string;
}

const TAGS = ['全部', '庐山家族', '角色三视图', '包装设计', '项目总览', '过程记录'];

export default function AigcSection({ id }: AigcSectionProps) {
  const gallery = useEditableGallery(AIGC_WORKS, 'portfolio.aigc');
  const { visible, editing, setEditing, remove, reorder, save, reset, removedCount, hasChanges } =
    gallery;
  const [activeTag, setActiveTag] = useState('全部');

  const shown = visible.filter((w) => editing || activeTag === '全部' || w.tag === activeTag);

  return (
    <section id={id} className="scroll-mt-16 bg-accent/10 py-24">
      <div className="mx-auto w-full max-w-[1680px] px-6 lg:px-10">
        <SectionHeader
          index="04"
          en="AIGC Competition"
          title="AIGC 创意文化比赛"
          desc="2026 一带一路暨金砖大赛 · 第二届 AIGC 文创设计赛项参赛作品——庐山文化 IP「庐山家族」孵化与文旅包装设计。"
        />

        {/* 赛事徽标 */}
        <Stagger className="mb-8 flex flex-wrap items-center gap-3">
          <StaggerItem>
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-white">
              <Trophy className="size-4" />
              参赛中 · AIGC 文创设计赛项
            </span>
          </StaggerItem>
          <StaggerItem>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-white px-4 py-1.5 text-sm font-medium text-accent">
              <Palette className="size-4" />
              庐山家族 · 文旅 IP 孵化
            </span>
          </StaggerItem>
        </Stagger>

        <GalleryEditorBar
          editing={editing}
          removedCount={removedCount}
          totalCount={AIGC_WORKS.length}
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
                      ? 'cursor-pointer rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white shadow-sm'
                      : 'cursor-pointer rounded-full border border-border bg-white px-5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-accent hover:text-accent'
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
          <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((work, i) => (
              <StaggerItem key={work.src}>
                <figure className="group relative overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative overflow-hidden">
                    <img
                      src={asset(work.src)}
                      alt={work.title}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-0.5 text-xs font-bold text-white shadow-sm">
                      {work.tag} · {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <figcaption className="p-4">
                    <p className="mb-1 text-sm font-bold">{work.title}</p>
                    <p className="text-xs text-muted-foreground">{work.desc}</p>
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
                className="group relative cursor-grab overflow-hidden rounded-2xl border-2 border-dashed border-accent/40 bg-white shadow-sm active:cursor-grabbing"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={asset(work.src)}
                    alt={work.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
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
                  <span className="shrink-0 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold text-accent">
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
