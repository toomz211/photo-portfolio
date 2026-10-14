import { useState } from 'react';
import { Play, Clock, X } from 'lucide-react';
import { asset } from '@/lib/paths';
import { VIDEOS } from '@/data/profile';
import SectionHeader from '@/pages/HomePage/sections/SectionHeader';
import { Stagger, StaggerItem } from '@/components/Reveal';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

export interface VideoSectionProps {
  id: string;
}

const GROUPS = ['全部', '主创作品', '比赛练习', 'AI 短片'];

export default function VideoSection({ id }: VideoSectionProps) {
  const [activeGroup, setActiveGroup] = useState('全部');
  const [active, setActive] = useState<number | null>(null);

  const filtered = VIDEOS.filter((v) => activeGroup === '全部' || v.group === activeGroup);
  const current = active !== null ? filtered[active] : null;

  return (
    <section id={id} className="scroll-mt-16 bg-background py-24">
      <div className="mx-auto w-full max-w-[1680px] px-6 lg:px-10">
        <SectionHeader
          index="05"
          en="Video Works"
          title="视频作品"
          desc="19 部作品，封面全部取自视频真实画面——从文旅宣传片到自导剧情短片，从非遗剪辑练习到 AI 短片实验。点击卡片即可播放。"
        />

        {/* 分组筛选 */}
        <Stagger className="mb-10 flex flex-wrap gap-3">
          {GROUPS.map((group) => (
            <StaggerItem key={group}>
              <button
                type="button"
                onClick={() => {
                  setActiveGroup(group);
                  setActive(null);
                }}
                className={
                  activeGroup === group
                    ? 'cursor-pointer rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-sm'
                    : 'cursor-pointer rounded-full border border-border bg-white px-5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary'
                }
              >
                {group}
                <span className="ml-1.5 text-xs opacity-70">
                  {group === '全部'
                    ? VIDEOS.length
                    : VIDEOS.filter((v) => v.group === group).length}
                </span>
              </button>
            </StaggerItem>
          ))}
        </Stagger>

        <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((video, i) => (
            <StaggerItem key={video.src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-white text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-video overflow-hidden bg-black">
                  <img
                    src={asset(video.poster)}
                    alt={video.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  {/* 播放按钮 */}
                  <span className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-primary shadow-xl transition-transform duration-300 group-hover:scale-110">
                    <Play className="size-7 fill-current" />
                  </span>
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    <Clock className="size-3.5" />
                    {video.duration}
                  </span>
                  <span className="absolute bottom-3 left-3 rounded-full bg-primary/90 px-2.5 py-0.5 text-xs font-bold text-white backdrop-blur-sm">
                    {video.group}
                  </span>
                </div>
                <div className="p-4">
                  <p className="mb-1 text-sm font-bold">{video.name}</p>
                  <p className="text-xs text-muted-foreground">{video.desc}</p>
                </div>
              </button>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      {/* 视频播放弹窗 */}
      <Dialog open={current !== null} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent
          className="max-w-4xl border-0 bg-black p-0"
          showCloseButton={false}
        >
          {current && (
            <>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 z-10 grid size-10 cursor-pointer place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30"
                aria-label="关闭播放"
              >
                <X className="size-5" />
              </button>
              <div className="aspect-video w-full overflow-hidden rounded-lg">
                <video
                  key={current.src}
                  src={asset(current.src)}
                  controls
                  autoPlay
                  playsInline
                  className="h-full w-full bg-black"
                />
              </div>
              <div className="flex items-center justify-between gap-4 px-4 pb-4 pt-1">
                <div>
                  <DialogTitle className="text-white">{current.name}</DialogTitle>
                  <DialogDescription className="text-white/60">
                    {current.desc} · 时长 {current.duration}
                  </DialogDescription>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
