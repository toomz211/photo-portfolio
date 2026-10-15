import { motion } from 'framer-motion';
import { ChevronDown, Play } from 'lucide-react';
import { asset } from '@/lib/paths';

export interface HeroSectionProps {
  onCtaClick: (id: string) => void;
}

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function HeroSection({ onCtaClick }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden"
    >
      {/* 动态视频背景 */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={asset('videos/posters/hero-bg.jpg')}
        src={asset('videos/hero-bg.mp4')}
        aria-label="摄影作品背景视频"
      />
      {/* 遮罩，保证文字可读 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/60" />

      {/* 首屏内容 */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1680px] flex-col items-center px-6 text-center text-white lg:px-10">
        <motion.p
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-[0.3em] uppercase backdrop-blur-sm"
        >
          <span className="inline-block size-1.5 rounded-full bg-primary" />
          Photographer &amp; Filmmaker
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 26, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.3, ease: EASE }}
          className="mb-4 text-6xl font-black tracking-tight drop-shadow-lg lg:text-8xl"
        >
          徐雨昊作品集
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          className="mb-6 text-xl font-light tracking-[0.35em] text-white/90 lg:text-2xl"
        >
          用镜头记录青春与热爱
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.68, ease: EASE }}
          className="mb-10 max-w-2xl text-base leading-relaxed text-white/80 lg:text-lg"
        >
          人像写真 · 婚礼跟拍 · 视频摄像 · 无人机航拍 · AI 视觉创作
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.86, ease: EASE }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            type="button"
            onClick={() => onCtaClick('works')}
            className="group inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 hover:bg-primary/90"
          >
            <Play className="size-4 transition-transform group-hover:scale-110" />
            浏览作品
          </button>
          <button
            type="button"
            onClick={() => onCtaClick('contact')}
            className="inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-white/40 bg-white/10 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/20"
          >
            联系合作
          </button>
        </motion.div>
      </div>

      {/* 向下滚动提示 */}
      <motion.button
        type="button"
        onClick={() => onCtaClick('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-1 text-white/70 transition-colors hover:text-white"
        aria-label="向下滚动"
      >
        <span className="text-xs tracking-[0.25em]">SCROLL</span>
        <ChevronDown className="size-5 animate-bounce" />
      </motion.button>
    </section>
  );
}
