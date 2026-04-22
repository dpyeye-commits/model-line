import Link from "next/link";
import { LayoutDashboard, Package, Shirt, BookOpen, Settings, Building2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { NavLink } from "./nav-link";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "업체 현황판", exact: true },
  { href: "/dashboard/fabrics", icon: Shirt, label: "소재 라이브러리" },
  { href: "/dashboard/products", icon: Package, label: "제품 라인" },
  { href: "/dashboard/catalog", icon: BookOpen, label: "카탈로그" },
  { href: "/dashboard/settings", icon: Settings, label: "설정" },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = user
    ? await supabase.from("profiles").select("role, full_name").eq("id", user.id).single()
    : { data: null };

  return (
    <div className="min-h-screen bg-zinc-950 flex">
      <aside className="w-60 border-r border-zinc-800 flex flex-col shrink-0">
        {/* 로고 */}
        <div className="px-6 py-5 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center">
              <Building2 className="w-4 h-4 text-zinc-950" />
            </div>
            <span className="text-base font-bold text-white">Model Line</span>
          </div>
          <p className="text-zinc-600 text-xs mt-1">경기섬유산업연합회</p>
        </div>

        {/* 네비 */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </nav>

        {/* 유저 정보 */}
        <div className="px-4 py-4 border-t border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center shrink-0">
              <span className="text-xs text-white font-medium">
                {(profile?.full_name ?? user?.email ?? "?")[0].toUpperCase()}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-medium truncate">
                {profile?.full_name ?? "관리자"}
              </p>
              <p className="text-zinc-500 text-xs truncate">{user?.email ?? ""}</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
