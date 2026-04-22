import Link from "next/link";
import { LayoutDashboard, Users, Building2, ShieldCheck, ArrowLeft } from "lucide-react";
import { GTIALogoIcon } from "@/components/gtia-logo";

const navItems = [
  { href: "/admin",        icon: LayoutDashboard, label: "관리 현황" },
  { href: "/admin/users",  icon: Users,           label: "사용자 관리" },
  { href: "/admin/brands", icon: Building2,        label: "업체 관리" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 flex">
      <aside className="w-60 border-r border-zinc-800 flex flex-col shrink-0">
        <div className="px-5 py-4 border-b border-zinc-800">
          <div className="flex items-center gap-2 mb-1">
            <GTIALogoIcon size={30} />
            <div>
              <p className="text-white font-bold text-xs leading-tight">슈퍼 관리자</p>
              <p className="text-zinc-500 text-[10px] leading-tight">경기섬유산업연합회</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map(({ href, icon: Icon, label }) => (
            <Link key={href} href={href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors text-sm"
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="px-4 py-4 border-t border-zinc-800">
          <Link href="/dashboard" className="flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> 대시보드로
          </Link>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
