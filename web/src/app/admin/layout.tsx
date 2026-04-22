import Link from "next/link";
import { LayoutDashboard, Users, Package, Settings, ShieldCheck } from "lucide-react";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "관리 현황" },
  { href: "/admin/users", icon: Users, label: "사용자 관리" },
  { href: "/admin/brands", icon: Package, label: "브랜드 관리" },
  { href: "/admin/settings", icon: Settings, label: "시스템 설정" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 flex">
      <aside className="w-60 border-r border-zinc-800 flex flex-col">
        <div className="px-6 py-5 border-b border-zinc-800 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-red-400" />
          <span className="text-lg font-bold text-white">관리자</span>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors text-sm"
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-zinc-800">
          <Link href="/dashboard" className="flex items-center gap-2 px-3 py-2 text-xs text-zinc-500 hover:text-zinc-300">
            ← 대시보드로 돌아가기
          </Link>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
