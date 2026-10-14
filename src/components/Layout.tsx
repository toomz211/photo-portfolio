import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Camera } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnchorLink from '@/components/AnchorLink';

const NAV_ITEMS: { href: string; label: string }[] = [
  { href: '#home', label: '首页' },
  { href: '#about', label: '个人经历' },
  { href: '#works', label: '摄影作品' },
  { href: '#ai', label: 'AI 创作' },
  { href: '#aigc', label: 'AIGC 比赛' },
  { href: '#videos', label: '视频作品' },
  { href: '#skills', label: '个人优势' },
  { href: '#contact', label: '联系我' },
];

export const Layout = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>('home');

  // 滚动阈值：离开首屏后给导航加深底色
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // 通过 IntersectionObserver 高亮当前阅读区块
  useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.href.replace('#', ''));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled
            ? 'border-b border-border/70 bg-background/85 backdrop-blur-md shadow-sm'
            : 'bg-transparent',
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1680px] items-center justify-between px-6 lg:px-10">
          <AnchorLink href="#home" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-white shadow-sm">
              <Camera className="size-5" />
            </span>
            <span className="text-lg font-bold tracking-wide">
              徐雨昊<span className="text-primary">作品集</span>
            </span>
          </AnchorLink>
          <nav className="hidden items-center gap-6 lg:flex">
            {NAV_ITEMS.map((item) => (
              <AnchorLink
                key={item.href}
                href={item.href}
                active={activeId === item.href.replace('#', '')}
              >
                {item.label}
              </AnchorLink>
            ))}
          </nav>
          {/* 移动端折叠导航 */}
          <details className="group lg:hidden">
            <summary className="grid h-9 w-9 cursor-pointer list-none place-items-center rounded-lg border border-border bg-background/70">
              <span className="text-lg leading-none">☰</span>
            </summary>
            <div className="absolute right-4 top-14 flex w-40 flex-col gap-1 rounded-xl border border-border bg-background p-2 shadow-lg">
              {NAV_ITEMS.map((item) => (
                <AnchorLink
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-2 hover:bg-muted"
                  onClick={() =>
                    (document.querySelector('details') as HTMLDetailsElement | null)?.removeAttribute(
                      'open',
                    )
                  }
                >
                  {item.label}
                </AnchorLink>
              ))}
            </div>
          </details>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default Layout;
