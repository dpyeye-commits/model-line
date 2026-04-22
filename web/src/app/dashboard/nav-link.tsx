"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Shirt, Package, BookOpen, Settings } from "lucide-react";

const icons: Record<string, React.ElementType> = {
  dashboard: LayoutDashboard,
  fabrics: Shirt,
  products: Package,
  catalog: BookOpen,
  settings: Settings,
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

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
        active
          ? "bg-white text-zinc-950 font-medium"
          : "text-zinc-400 hover:text-white hover:bg-zinc-800"
      }`}
    >
      <Icon className="w-4 h-4 shrink-0" />
      {label}
    </Link>
  );
}
