import Link from "next/link";
import { LayoutDashboard, Package, Shirt, BookOpen, Settings } from "lucide-react";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "대시보드" },
  { href: "/dashboard/products", icon: Package, label: "제품 라인" },
  { href: "/dashboard/fabrics", icon: Shirt, label: "소재 라이브러리" },
  { href: "/dashboard/catalog", icon: BookOpen, label: "카탈로그" },
  { href: "/dashboard/settings", icon: Settings, label: "설정" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 flex">
      {/* 사이드바 */}
      <aside className="w-60 border-r border-zinc-800 flex flex-col">
        <div className="px-6 py-5 border-b border-zinc-800">
          <span className="text-lg font-bold text-white">Model Line</span>
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
          <div className="px-3 py-2 text-xs text-zinc-500">브랜드명</div>
        </div>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
