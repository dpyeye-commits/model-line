"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Shirt, Package, BookOpen, Settings, Cpu } from "lucide-react";

const icons: Record<string, React.ElementType> = {
  dashboard: LayoutDashboard,
  fabrics: Shirt,
  products: Package,
  catalog: BookOpen,
  "ai-studio": Cpu,
  settings: Settings,
};

const activeStyle: Record<string, { bg: string; text: string; icon: string }> = {
  dashboard:  { bg: "bg-emerald-500/15 border border-emerald-500/25", text: "text-emerald-300 font-medium", icon: "text-emerald-400" },
  fabrics:    { bg: "bg-cyan-500/15 border border-cyan-500/25",       text: "text-cyan-300 font-medium",    icon: "text-cyan-400" },
  products:   { bg: "bg-violet-500/15 border border-violet-500/25",   text: "text-violet-300 font-medium",  icon: "text-violet-400" },
  catalog:    { bg: "bg-pink-500/15 border border-pink-500/25",       text: "text-pink-300 font-medium",    icon: "text-pink-400" },
  "ai-studio":{ bg: "bg-amber-500/15 border border-amber-500/25",     text: "text-amber-300 font-medium",   icon: "text-amber-400" },
  settings:   { bg: "bg-zinc-700/40 border border-zinc-600/30",       text: "text-zinc-200 font-medium",    icon: "text-zinc-300" },
};

interface NavLinkProps {
  href: string;
  iconKey: string;
  label: string;
  exact?: boolean;
}

export function NavLink({ href, iconKey, label, exact }: NavLinkProps) {
  const pathname = usePathname();
  const active = exact ? pathname === href : pathname.startsWith(href);
  const Icon = icons[iconKey] ?? LayoutDashboard;
  const style = activeStyle[iconKey] ?? activeStyle.settings;

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all border ${
        active
          ? `${style.bg} ${style.text}`
          : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5 border-transparent"
      }`}
    >
      <Icon className={`w-4 h-4 shrink-0 ${active ? style.icon : "text-zinc-600"}`} />
      {label}
    </Link>
  );
}
