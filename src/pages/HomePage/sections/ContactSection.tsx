import {
  Phone,
  Mail,
  MapPin,
  Camera,
  Plane,
  Rocket,
  Grip,
  MonitorPlay,
  Sparkles,
  Heart,
} from 'lucide-react';
import { CONTACT, GEARS, PROFILE } from '@/data/profile';
import SectionHeader from '@/pages/HomePage/sections/SectionHeader';
import { Reveal, Stagger, StaggerItem } from '@/components/Reveal';

export interface ContactSectionProps {
  id: string;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Camera,
  Plane,
  Rocket,
  Grip,
  MonitorPlay,
  Sparkles,
};

export default function ContactSection({ id }: ContactSectionProps) {
  return (
    <section
      id={id}
      className="scroll-mt-16 bg-[#171a21] py-24 text-white"
    >
      <div className="mx-auto w-full max-w-[1680px] px-6 lg:px-10">
        <SectionHeader
          index="07"
          en="Contact"
          title="联系我"
          desc="如果你有拍摄需求、合作想法，或者只是想聊聊影像——欢迎随时联系。"
          light
        />

        {/* 联系方式 */}
        <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StaggerItem>
            <a
              href={`tel:${CONTACT.phoneRaw}`}
              className="group flex h-full flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:-translate-y-1 hover:border-primary/60 hover:bg-primary/10"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-primary text-white">
                <Phone className="size-5" />
              </span>
              <div>
                <p className="text-xs font-medium tracking-wider text-white/50 uppercase">电话 / 微信</p>
                <p className="mt-1 text-lg font-bold">{CONTACT.phone}</p>
              </div>
            </a>
          </StaggerItem>
          <StaggerItem>
            <a
              href={`mailto:${CONTACT.email}`}
              className="group flex h-full flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:-translate-y-1 hover:border-primary/60 hover:bg-primary/10"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-accent text-white">
                <Mail className="size-5" />
              </span>
              <div>
                <p className="text-xs font-medium tracking-wider text-white/50 uppercase">邮箱</p>
                <p className="mt-1 text-lg font-bold">{CONTACT.email}</p>
              </div>
            </a>
          </StaggerItem>
          <StaggerItem>
            <div className="flex h-full flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-6">
              <span className="grid size-11 place-items-center rounded-xl bg-warning text-white">
                <MapPin className="size-5" />
              </span>
              <div>
                <p className="text-xs font-medium tracking-wider text-white/50 uppercase">所在地</p>
                <p className="mt-1 text-lg font-bold">{CONTACT.location}</p>
              </div>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="flex h-full flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-6">
              <span className="grid size-11 place-items-center rounded-xl bg-[#6366f1] text-white">
                <Camera className="size-5" />
              </span>
              <div>
                <p className="text-xs font-medium tracking-wider text-white/50 uppercase">身份</p>
                <p className="mt-1 text-lg font-bold">{PROFILE.role}</p>
              </div>
            </div>
          </StaggerItem>
        </Stagger>

        {/* 摄影器材 */}
        <Reveal delay={0.08}>
          <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-8">
            <h3 className="mb-6 flex items-center gap-2.5 text-lg font-bold">
              <span className="grid size-8 place-items-center rounded-lg bg-primary text-white">
                <Sparkles className="size-4" />
              </span>
              摄影器材与工具
            </h3>
            <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {GEARS.map((gear) => {
                const Icon = ICON_MAP[gear.icon] ?? Camera;
                return (
                  <StaggerItem key={gear.name}>
                    <div className="flex items-center gap-3.5 rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 transition-colors hover:border-primary/50">
                      <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-white/10 text-primary">
                        <Icon className="size-5" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold">{gear.name}</p>
                        <p className="truncate text-xs text-white/55">{gear.detail}</p>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </Reveal>

        {/* 页脚 */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-white/60">
            © 2026 {PROFILE.name} · 摄影作品集 —— 用镜头记录青春与热爱
          </p>
          <p className="flex items-center gap-1.5 text-sm text-white/60">
            刚出新手的村，继续升级，
            <Heart className="size-4 fill-primary text-primary" />
            无限进步
          </p>
        </div>
      </div>
    </section>
  );
}
