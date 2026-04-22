import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { NavLink } from "./nav-link";
import { GTIALogoIcon } from "@/components/gtia-logo";

const navItems = [
  { href: "/dashboard",             iconKey: "dashboard",  label: "업체 현황판",    exact: true },
  { href: "/dashboard/fabrics",     iconKey: "fabrics",    label: "소재 라이브러리" },
  { href: "/dashboard/products",    iconKey: "products",   label: "제품 라인" },
  { href: "/dashboard/catalog",     iconKey: "catalog",    label: "카탈로그" },
  { href: "/dashboard/ai-studio",   iconKey: "ai-studio",  label: "AI 스튜디오" },
  { href: "/dashboard/settings",    iconKey: "settings",   label: "설정" },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = user
    ? await supabase.from("profiles").select("role, full_name").eq("id", user.id).single()
    : { data: null };

  return (
    <div className="min-h-screen bg-zinc-950 flex">
      <aside className="w-60 border-r border-white/5 flex flex-col shrink-0 bg-zinc-950">
        {/* 로고 헤더 */}
        <div className="px-4 py-5 border-b border-white/5">
          <div className="flex items-center gap-2.5 mb-2">
            <GTIALogoIcon size={36} />
            <div>
              <p className="text-white font-bold text-sm leading-tight">경기섬유산업연합회</p>
              <p className="text-zinc-500 text-xs leading-tight">GTIA · 텍스타일 디지털화</p>
            </div>
          </div>
          <p className="text-zinc-600 text-xs mt-2 leading-relaxed pl-0.5">
            양주·포천·동두천<br />글로벌 섬유·패션산업특구
          </p>
        </div>

        {/* 네비게이션 */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </nav>

        {/* 하단 유저 정보 */}
        <div className="px-4 py-4 border-t border-white/5 space-y-3">
          {profile?.role === "super_admin" && (
            <Link href="/admin"
              className="flex items-center gap-2 text-xs text-red-400 hover:text-red-300 transition-colors px-1 py-1 rounded-lg hover:bg-red-500/10"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              관리자 패널
            </Link>
          )}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <span className="text-xs text-emerald-300 font-semibold">
                {(profile?.full_name ?? user?.email ?? "?")[0].toUpperCase()}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-zinc-200 text-xs font-medium truncate">{profile?.full_name ?? "관리자"}</p>
              <p className="text-zinc-600 text-xs truncate">{user?.email ?? ""}</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-auto bg-zinc-950">{children}</main>
    </div>
  );
}
