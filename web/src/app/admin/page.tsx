import { createClient } from "@/lib/supabase/server";
import { Users, Building2, Layers, CheckCircle2, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { SectionHeader } from "@/components/section-header";

const MAP_FIELDS = [
  "swatch_url","color_map_url","normal_map_url","reflection_map_url",
  "transparency_map_url","draping_url","virtual_mapping_url",
];

export default async function AdminPage() {
  const supabase = await createClient();

  const [
    { count: userCount },
    { count: brandCount },
    { data: fabrics },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("brands").select("*", { count: "exact", head: true }),
    supabase.from("fabrics").select(MAP_FIELDS.join(",")),
  ]);

  const fabricList = fabrics ?? [];
  const completedFabrics = fabricList.filter(f =>
    MAP_FIELDS.every(k => (f as any)[k])
  ).length;
  const totalPct = fabricList.length === 0 ? 0 :
    Math.round(fabricList.reduce((s, f: any) => {
      return s + MAP_FIELDS.filter(k => f[k]).length / MAP_FIELDS.length;
    }, 0) / fabricList.length * 100);

  const stats = [
    { label: "가입 사용자", value: userCount ?? 0, icon: Users, color: "text-blue-400" },
    { label: "참여 업체", value: brandCount ?? 0, icon: Building2, color: "text-violet-400" },
    { label: "등록 소재", value: fabricList.length, icon: Layers, color: "text-amber-400" },
    { label: "완전 디지털화", value: completedFabrics, icon: CheckCircle2, color: "text-green-400" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <SectionHeader title="관리 현황" subtitle="경기섬유산업연합회 텍스타일 디지털화 사업 전체 현황" icon={ShieldCheck} color="violet" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-zinc-400 text-sm">{label}</span>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <div className="text-3xl font-bold text-white">{value}</div>
          </div>
        ))}
      </div>

      {/* 전체 진행률 */}
      <div className="bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 border border-emerald-500/15 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-0.5 h-5 rounded-full bg-gradient-to-b from-emerald-400 to-cyan-400" />
            <h2 className="text-white font-semibold">전체 디지털화 진행률</h2>
          </div>
          <span className="text-2xl font-bold text-white">{totalPct}%</span>
        </div>
        <div className="w-full bg-zinc-800 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full h-3 transition-all"
            style={{ width: `${totalPct}%` }}
          />
        </div>
        <p className="text-zinc-500 text-xs mt-2">
          {completedFabrics}종 완료 / 전체 {fabricList.length}종 등록
        </p>
      </div>

      {/* 바로가기 */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-0.5 h-4 rounded-full bg-gradient-to-b from-violet-400 to-pink-400" />
        <h2 className="text-white font-semibold text-sm">바로가기</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Link href="/admin/users">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-600 transition-colors cursor-pointer">
            <Users className="w-6 h-6 text-blue-400 mb-3" />
            <h3 className="text-white font-medium text-sm mb-1">사용자 관리</h3>
            <p className="text-zinc-500 text-xs">가입 사용자 목록 및 역할 관리</p>
          </div>
        </Link>
        <Link href="/admin/brands">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-600 transition-colors cursor-pointer">
            <Building2 className="w-6 h-6 text-violet-400 mb-3" />
            <h3 className="text-white font-medium text-sm mb-1">업체 관리</h3>
            <p className="text-zinc-500 text-xs">16개 참여 업체 정보 관리</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
