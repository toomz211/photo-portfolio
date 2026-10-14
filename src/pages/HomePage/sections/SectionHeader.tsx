import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface SectionHeaderProps {
  index: string;
  en: string;
  title: string;
  desc?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function SectionHeader({
  index,
  en,
  title,
  desc,
  align = 'left',
  light = false,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.7, ease: EASE }}
      className={cn(
        'mb-12 flex flex-col gap-3',
        align === 'center' && 'items-center text-center',
      )}
    >
      <div
        className={cn(
          'flex items-center gap-3 text-xs font-semibold tracking-[0.3em] uppercase',
          light ? 'text-white/60' : 'text-primary',
        )}
      >
        <span className="rounded-full border border-current px-3 py-1">{index}</span>
        <span>{en}</span>
      </div>
      <h2
        className={cn(
          'text-3xl font-bold tracking-tight lg:text-4xl',
          light && 'text-white',
        )}
      >
        {title}
      </h2>
      {desc && (
        <p className={cn('max-w-2xl text-base leading-relaxed', light ? 'text-white/70' : 'text-muted-foreground')}>
          {desc}
        </p>
      )}
    </motion.div>
  );
}
