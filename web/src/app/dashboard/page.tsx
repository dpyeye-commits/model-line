import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { CheckCircle2, Clock, AlertCircle, ChevronRight, Package, Layers } from "lucide-react";

const MAP_FIELDS = [
  "swatch_url", "color_map_url", "normal_map_url", "reflection_map_url",
  "transparency_map_url", "draping_url", "virtual_mapping_url",
];

const planLabel: Record<string, string> = {
  plan_a: "1안",
  plan_b: "2안",
};

function getStatus(pct: number) {
  if (pct === 100) return { label: "완료", color: "text-green-400", bg: "bg-green-400/10 border-green-400/30", icon: CheckCircle2 };
  if (pct > 0)     return { label: "진행중", color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/30", icon: Clock };
  return           { label: "미시작", color: "text-zinc-500",  bg: "bg-zinc-800 border-zinc-700", icon: AlertCircle };
}

export default async function DashboardPage() {
  const supabase = await createClient();

  // 전체 업체 + 소재 현황
  const { data: brands } = await supabase
    .from("brands")
    .select(`
      id, name, description, content_plan, logo_url,
      fabrics (
        id, swatch_url, color_map_url, normal_map_url,
        reflection_map_url, transparency_map_url, draping_url, virtual_mapping_url
      )
    `)
    .order("created_at", { ascending: true });

  const allBrands = brands ?? [];

  // 전체 통계
  const totalFabrics = allBrands.reduce((s, b) => s + (b.fabrics?.length ?? 0), 0);
  const completedBrands = allBrands.filter(b => {
    if (!b.fabrics?.length) return false;
    const avgPct = b.fabrics.reduce((s: number, f: any) => {
      const done = MAP_FIELDS.filter(k => f[k]).length;
      return s + (done / MAP_FIELDS.length);
    }, 0) / b.fabrics.length;
    return avgPct === 1;
  }).length;

  const stats = [
    { label: "참여 업체", value: allBrands.length, sub: "총 16개사" },
    { label: "등록 소재", value: totalFabrics, sub: "원단 샘플" },
    { label: "완료 업체", value: completedBrands, sub: "디지털화 100%" },
    { label: "진행률", value: `${Math.round((completedBrands / Math.max(allBrands.length, 1)) * 100)}%`, sub: "전체 완성도" },
  ];

  return (
    <div className="p-8">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">텍스타일 디지털화 현황</h1>
        <p className="text-zinc-400 mt-1">경기섬유산업연합회 · 참여 업체 소재 디지털 컨텐츠 제작 현황</p>
      </div>

      {/* 통계 */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, sub }) => (
          <div key={label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <p className="text-zinc-400 text-sm mb-1">{label}</p>
            <p className="text-3xl font-bold text-white">{value}</p>
            <p className="text-zinc-500 text-xs mt-1">{sub}</p>
          </div>
        ))}
      </div>

      {/* 업체 그리드 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allBrands.map((brand, idx) => {
          const fabrics = brand.fabrics ?? [];
          const fabricCount = fabrics.length;

          const avgPct = fabricCount === 0 ? 0 :
            Math.round(
              fabrics.reduce((s: number, f: any) => {
                const done = MAP_FIELDS.filter(k => f[k]).length;
                return s + (done / MAP_FIELDS.length) * 100;
              }, 0) / fabricCount
            );

          const status = getStatus(fabricCount === 0 ? 0 : avgPct);
          const StatusIcon = status.icon;

          return (
            <Link key={brand.id} href={`/dashboard/company/${brand.id}`}>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-600 transition-all hover:bg-zinc-800/50 cursor-pointer group h-full">
                {/* 번호 + 플랜 */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-zinc-600 text-xs font-mono">#{String(idx + 1).padStart(2, "0")}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${status.bg} ${status.color}`}>
                    {planLabel[brand.content_plan ?? "plan_a"]}
                  </span>
                </div>

                {/* 로고 / 아이콘 */}
                <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center mb-3 overflow-hidden">
                  {brand.logo_url ? (
                    <img src={brand.logo_url} alt={brand.name} className="w-full h-full object-cover" />
                  ) : (
                    <Layers className="w-6 h-6 text-zinc-500" />
                  )}
                </div>

                {/* 업체명 */}
                <h3 className="text-white font-semibold text-sm leading-tight mb-1">{brand.name}</h3>
                {brand.description && (
                  <p className="text-zinc-500 text-xs mb-3 line-clamp-1">{brand.description}</p>
                )}

                {/* 소재 수 */}
                <div className="flex items-center gap-1.5 mb-3">
                  <Package className="w-3.5 h-3.5 text-zinc-500" />
                  <span className="text-zinc-400 text-xs">소재 {fabricCount}종</span>
                </div>

                {/* 진행 바 */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className={`flex items-center gap-1 ${status.color}`}>
                      <StatusIcon className="w-3 h-3" />
                      {status.label}
                    </span>
                    <span className="text-zinc-500">{fabricCount === 0 ? "—" : `${avgPct}%`}</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-1.5">
                    <div
                      className={`rounded-full h-1.5 transition-all ${
                        avgPct === 100 ? "bg-green-400" : avgPct > 0 ? "bg-amber-400" : "bg-zinc-700"
                      }`}
                      style={{ width: fabricCount === 0 ? "0%" : `${avgPct}%` }}
                    />
                  </div>
                </div>

                <ChevronRight className="w-3.5 h-3.5 text-zinc-700 group-hover:text-zinc-400 transition-colors mt-3 ml-auto" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
