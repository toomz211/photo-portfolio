import { GraduationCap, Trophy, CalendarDays } from 'lucide-react';
import { cn } from '@/lib/utils';
import { asset } from '@/lib/paths';
import { PROFILE } from '@/data/profile';
import SectionHeader from '@/pages/HomePage/sections/SectionHeader';
import { Reveal, Stagger, StaggerItem } from '@/components/Reveal';

export interface AboutSectionProps {
  id: string;
}

const TONE_CLASS: Record<string, string> = {
  success: 'bg-success/10 text-success border-success/30',
  primary: 'bg-primary/10 text-primary border-primary/30',
  warning: 'bg-warning/10 text-warning border-warning/30',
};

export default function AboutSection({ id }: AboutSectionProps) {
  return (
    <section id={id} className="scroll-mt-16 bg-background py-24">
      <div className="mx-auto w-full max-w-[1680px] px-6 lg:px-10">
        <SectionHeader
          index="01"
          en="About Me"
          title="个人经历"
          desc="从校园宣传部到商业拍摄，从自学入门到系统进阶——我的镜头一直在成长。"
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[380px_1fr] lg:gap-16">
          {/* 人物照片卡片 */}
          <Reveal y={40}>
            <div className="relative">
              <div className="absolute -left-4 -top-4 h-28 w-28 rounded-2xl bg-primary/20" />
              <div className="absolute -bottom-4 -right-4 h-28 w-28 rounded-2xl bg-accent/20" />
              <div className="relative overflow-hidden rounded-3xl border border-border bg-white shadow-sm">
                <img
                  src={asset('images/portrait.jpg')}
                  alt={`${PROFILE.name} 证件照`}
                  className="aspect-[3/4] w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 text-white">
                  <p className="text-lg font-bold">{PROFILE.name}</p>
                  <p className="text-sm text-white/80">{PROFILE.role}</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* 介绍与经历 */}
          <div className="flex flex-col gap-8">
            <Reveal delay={0.05}>
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
                  <GraduationCap className="size-4 text-primary" />
                  {PROFILE.school}
                </div>
                <p className="text-lg leading-relaxed text-foreground/85">{PROFILE.intro}</p>
              </div>
            </Reveal>

            {/* 成长时间线 */}
            <Stagger>
              {PROFILE.experience.map((item, i) => (
                <StaggerItem key={item.period} className="relative flex gap-5 pb-6 last:pb-0">
                  {/* 时间轴 */}
                  <div className="flex flex-col items-center">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-white">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {i < PROFILE.experience.length - 1 && (
                      <span className="mt-1 w-px flex-1 bg-border" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-3">
                      <span className="rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                        {item.period}
                      </span>
                      <h3 className="text-base font-bold">{item.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            {/* 赛事荣誉 */}
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-2 text-sm font-bold tracking-wide">
                  <Trophy className="size-4 text-primary" />
                  赛事与荣誉
                </div>
                <Stagger className="flex flex-col gap-3">
                  {PROFILE.awards.map((a) => (
                    <StaggerItem key={a.title}>
                      <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-background px-4 py-3">
                        <div className="flex min-w-0 items-center gap-3">
                          <CalendarDays className="size-4 shrink-0 text-muted-foreground" />
                          <span className="truncate text-sm font-medium">{a.title}</span>
                        </div>
                        <span
                          className={cn(
                            'shrink-0 rounded-full border px-3 py-0.5 text-xs font-semibold',
                            TONE_CLASS[a.tone],
                          )}
                        >
                          {a.year} · {a.status}
                        </span>
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
