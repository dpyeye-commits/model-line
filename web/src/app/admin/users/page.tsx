import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

const roleColors: Record<string, string> = {
  super_admin: "bg-red-500/20 text-red-400 border-red-500/30",
  brand_admin: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  agency_manager: "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

const roleLabels: Record<string, string> = {
  super_admin: "관리자",
  brand_admin: "브랜드",
  agency_manager: "에이전시",
};

export default function AdminUsersPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">사용자 관리</h1>
          <p className="text-zinc-400 mt-1">가입된 사용자 목록 및 역할 관리</p>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-6 text-sm text-zinc-400">
        <p className="text-white font-medium mb-1">역할 변경 방법</p>
        <p>Supabase 대시보드 → Table Editor → profiles 테이블에서 role 컬럼 직접 수정</p>
        <code className="block bg-zinc-950 rounded p-2 text-green-400 text-xs mt-2">
          UPDATE profiles SET role = &apos;super_admin&apos; WHERE email = &apos;대상이메일&apos;;
        </code>
      </div>

      <div className="border border-dashed border-zinc-700 rounded-xl p-16 text-center">
        <Users className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
        <h3 className="text-white font-medium mb-2">Supabase 연결 후 사용자 목록이 표시됩니다</h3>
        <p className="text-zinc-400 text-sm">.env.local에 Supabase URL과 키를 입력하세요</p>
      </div>
    </div>
  );
}
