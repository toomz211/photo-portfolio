import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';
import { BadgeCheck } from 'lucide-react';
import { SKILLS, SOFT_TRAITS } from '@/data/profile';
import SectionHeader from '@/pages/HomePage/sections/SectionHeader';
import { Reveal, Stagger, StaggerItem } from '@/components/Reveal';

export interface SkillsSectionProps {
  id: string;
}

/** 进度条数值动画：组件挂载后延迟触发，保证任何环境下数值均正确显示 */
function useInView() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 200);
    return () => window.clearTimeout(timer);
  }, []);
  return { ref, visible };
}

const radarOption: EChartsOption = {
  tooltip: { trigger: 'item' },
  radar: {
    indicator: SKILLS.map((s) => ({ name: s.name, max: 100 })),
    radius: '68%',
    splitNumber: 4,
    axisName: { color: '#2a2a33', fontSize: 13, fontWeight: 600 },
    splitArea: {
      areaStyle: { color: ['rgba(255,255,255,0.6)', 'rgba(255,122,69,0.05)'] },
    },
    splitLine: { lineStyle: { color: '#e8e4dc' } },
    axisLine: { lineStyle: { color: '#e8e4dc' } },
  },
  series: [
    {
      type: 'radar',
      data: [
        {
          value: SKILLS.map((s) => s.value),
          name: '综合能力',
          areaStyle: { color: 'rgba(255,122,69,0.35)' },
          lineStyle: { color: '#ff7a45', width: 2 },
          itemStyle: { color: '#ff7a45' },
          symbolSize: 5,
        },
      ],
    },
  ],
};

/** 手写 ECharts 初始化，规避 echarts-for-react 与 React 19 的兼容问题 */
function RadarChart() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const chart = echarts.init(el);
    chart.setOption(radarOption);
    const onResize = () => chart.resize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      chart.dispose();
    };
  }, []);
  return <div ref={ref} className="h-[420px] w-full" />;
}

export default function SkillsSection({ id }: SkillsSectionProps) {
  const { ref, visible } = useInView();

  return (
    <section id={id} className="scroll-mt-16 bg-muted/40 py-24">
      <div className="mx-auto w-full max-w-[1680px] px-6 lg:px-10">
        <SectionHeader
          index="06"
          en="My Strengths"
          title="个人优势"
          desc="摄影、摄像与 AI 创作的交叉能力，让我既能在现场捕捉真实，也能在数字世界再造想象。"
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* 技能进度条 */}
          <div ref={ref} className="flex flex-col gap-6">
            <Stagger className="flex flex-col gap-6">
              {SKILLS.map((skill, i) => (
                <StaggerItem key={skill.name}>
                  <div>
                    <div className="mb-2 flex items-end justify-between">
                      <div>
                        <p className="text-sm font-bold">{skill.name}</p>
                        <p className="text-xs text-muted-foreground">{skill.hint}</p>
                      </div>
                      <span className="text-2xl font-black text-primary">
                        {visible ? skill.value : 0}
                        <span className="text-sm font-semibold">%</span>
                      </span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-border/60">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out"
                        style={{
                          width: visible ? `${skill.value}%` : '0%',
                          transitionDelay: `${i * 120}ms`,
                        }}
                      />
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            {/* 软实力标签 */}
            <Reveal delay={0.15}>
              <div className="mt-2 flex flex-wrap gap-2.5">
                {SOFT_TRAITS.map((trait) => (
                  <span
                    key={trait}
                    className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-white px-3.5 py-1.5 text-sm font-medium text-primary"
                  >
                    <BadgeCheck className="size-4" />
                    {trait}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* 能力雷达图 */}
          <Reveal delay={0.1} y={36}>
            <div className="rounded-3xl border border-border bg-white p-6 shadow-sm">
              <RadarChart />
              <p className="mt-2 text-center text-xs text-muted-foreground">
                六维能力雷达 · 基于真实项目经验自评
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
