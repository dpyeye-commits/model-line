import { Card } from "@/components/ui/card";
import { Users, Package, ShieldCheck, Activity } from "lucide-react";

const stats = [
  { label: "전체 사용자", value: "0", icon: Users },
  { label: "등록 브랜드", value: "0", icon: Package },
  { label: "관리자", value: "1", icon: ShieldCheck },
  { label: "오늘 접속", value: "0", icon: Activity },
];

export default function AdminPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">관리 현황</h1>
        <p className="text-zinc-400 mt-1">Model Line 전체 현황을 관리합니다</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon }) => (
          <Card key={label} className="bg-zinc-900 border-zinc-800 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-zinc-400 text-sm">{label}</span>
              <Icon className="w-4 h-4 text-zinc-500" />
            </div>
            <div className="text-3xl font-bold text-white">{value}</div>
          </Card>
        ))}
      </div>

      {/* 관리자 생성 안내 */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-white font-semibold mb-3 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-red-400" />
          관리자 계정 추가 방법
        </h2>
        <div className="space-y-3 text-sm text-zinc-400">
          <div className="bg-zinc-800 rounded-lg p-4 space-y-2">
            <p className="text-white font-medium">방법 1. Supabase 대시보드 (권장)</p>
            <ol className="space-y-1 list-decimal list-inside">
              <li>Supabase → Authentication → Users → Invite User</li>
              <li>관리자 이메일 입력 후 초대 발송</li>
              <li>가입 완료 후 SQL 실행:</li>
            </ol>
            <code className="block bg-zinc-950 rounded p-2 text-green-400 text-xs mt-2">
              UPDATE profiles SET role = &apos;super_admin&apos; WHERE email = &apos;admin@example.com&apos;;
            </code>
          </div>
          <div className="bg-zinc-800 rounded-lg p-4 space-y-2">
            <p className="text-white font-medium">방법 2. 자동 승급 (현재 설정)</p>
            <p>dpyeye@gmail.com 으로 가입 시 자동으로 super_admin 부여</p>
          </div>
        </div>
      </div>
    </div>
  );
}
