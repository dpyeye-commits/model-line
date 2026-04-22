import Link from "next/link";
import { Building2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { NavLink } from "./nav-link";

const navItems = [
  { href: "/dashboard",          iconKey: "dashboard", label: "업체 현황판",    exact: true },
  { href: "/dashboard/fabrics",  iconKey: "fabrics",   label: "소재 라이브러리" },
  { href: "/dashboard/products", iconKey: "products",  label: "제품 라인" },
  { href: "/dashboard/catalog",  iconKey: "catalog",   label: "카탈로그" },
  { href: "/dashboard/settings", iconKey: "settings",  label: "설정" },
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
        <div className="px-5 py-4 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shrink-0">
              <span className="text-zinc-950 font-black text-sm leading-none">경</span>
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">경기섬유산업연합회</p>
              <p className="text-zinc-500 text-xs leading-tight">텍스타일 디지털화</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center shrink-0">
              <span className="text-xs text-white font-medium">
                {(profile?.full_name ?? user?.email ?? "?")[0].toUpperCase()}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-medium truncate">{profile?.full_name ?? "관리자"}</p>
              <p className="text-zinc-500 text-xs truncate">{user?.email ?? ""}</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
