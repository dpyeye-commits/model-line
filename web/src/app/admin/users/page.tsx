import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { RoleSelect } from "./role-select";
import { SectionHeader } from "@/components/section-header";

const roleStyle: Record<string, string> = {
  super_admin:    "bg-red-500/20 text-red-400 border-red-500/30",
  brand_admin:    "bg-blue-500/20 text-blue-400 border-blue-500/30",
  agency_manager: "bg-purple-500/20 text-purple-400 border-purple-500/30",
};
const roleLabel: Record<string, string> = {
  super_admin: "슈퍼관리자", brand_admin: "브랜드", agency_manager: "에이전시",
};

export default async function AdminUsersPage() {
  const supabase = await createClient();
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, created_at")
    .order("created_at", { ascending: false });

  const list = profiles ?? [];

  return (
    <div className="p-8">
      <div className="mb-8">
        <SectionHeader title="사용자 관리" subtitle={`가입된 사용자 ${list.length}명`} icon={Users} color="cyan" />
      </div>

      {list.length === 0 ? (
        <div className="border border-dashed border-zinc-700 rounded-xl p-16 text-center">
          <Users className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <p className="text-white font-medium">가입된 사용자가 없습니다</p>
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left px-5 py-3 text-zinc-500 font-medium">이름</th>
                <th className="text-left px-5 py-3 text-zinc-500 font-medium">이메일</th>
                <th className="text-left px-5 py-3 text-zinc-500 font-medium">역할</th>
                <th className="text-left px-5 py-3 text-zinc-500 font-medium">가입일</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {list.map((p: any) => (
                <tr key={p.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                  <td className="px-5 py-3 text-white">{p.full_name ?? "—"}</td>
                  <td className="px-5 py-3 text-zinc-300">{p.email}</td>
                  <td className="px-5 py-3">
                    <Badge className={roleStyle[p.role] ?? "bg-zinc-800 text-zinc-400"}>
                      {roleLabel[p.role] ?? p.role}
                    </Badge>
                  </td>
                  <td className="px-5 py-3 text-zinc-500">
                    {new Date(p.created_at).toLocaleDateString("ko-KR")}
                  </td>
                  <td className="px-5 py-3">
                    <RoleSelect userId={p.id} role={p.role} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
