import { motion, type Variants } from 'framer-motion';
import type { PropsWithChildren } from 'react';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface RevealProps {
  delay?: number;
  y?: number;
  className?: string;
}

/** 通用进场动画：滚动进入视口时丝滑浮现 */
export function Reveal({ children, delay = 0, y = 32, className }: PropsWithChildren<RevealProps>) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const staggerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const itemVariants = (y: number): Variants => ({
  hidden: { opacity: 0, y },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
});

interface StaggerProps {
  className?: string;
}

/** 交错进场容器：子项逐个浮现 */
export function Stagger({ children, className }: PropsWithChildren<StaggerProps>) {
  return (
    <motion.div
      className={className}
      variants={staggerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.08, margin: '0px 0px -40px 0px' }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  className?: string;
  y?: number;
}

/** 交错进场子项，必须放在 Stagger 内 */
export function StaggerItem({ children, className, y = 28 }: PropsWithChildren<StaggerItemProps>) {
  return (
    <motion.div className={className} variants={itemVariants(y)}>
      {children}
    </motion.div>
  );
}
