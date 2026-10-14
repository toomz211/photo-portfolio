import { useCallback } from 'react';
import { cn } from '@/lib/utils';

export interface AnchorLinkProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  className?: string;
  onClick?: () => void;
}

/**
 * 整页滚动锚点链接：平滑滚动到目标 section 并同步 URL hash。
 * 不依赖路由 NavLink（单页锚点场景）。
 */
export default function AnchorLink({
  href,
  children,
  active,
  className,
  onClick,
}: AnchorLinkProps) {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const id = href.replace(/^#/, '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      try {
        history.replaceState(null, '', `#${id}`);
      } catch {
        /* 忽略不支持 history 的环境 */
      }
      onClick?.();
    },
    [href, onClick],
  );

  return (
    <a
      href={href}
      onClick={handleClick}
      aria-current={active ? 'true' : undefined}
      className={cn(
        'cursor-pointer text-sm font-medium tracking-wide transition-colors',
        active
          ? 'text-primary'
          : 'text-foreground/70 hover:text-primary',
        className,
      )}
    >
      {children}
    </a>
  );
}
