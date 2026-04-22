import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { CheckCircle2, Clock, AlertCircle, ChevronRight, Layers, TrendingUp } from "lucide-react";

const MAP_FIELDS = [
  "swatch_url","color_map_url","normal_map_url","reflection_map_url",
  "transparency_map_url","draping_url","virtual_mapping_url",
];

const planLabel: Record<string, string> = { plan_a: "1안", plan_b: "2안" };

function getStatus(pct: number) {
  if (pct === 100) return {
    label: "완료", icon: CheckCircle2,
    text: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/30",
    bar: "bg-gradient-to-r from-emerald-400 to-cyan-400",
    glow: "shadow-emerald-500/20",
  };
  if (pct > 0) return {
    label: "진행중", icon: Clock,
    text: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/30",
    bar: "bg-gradient-to-r from-amber-400 to-orange-400",
    glow: "shadow-amber-500/10",
  };
  return {
    label: "미시작", icon: AlertCircle,
    text: "text-zinc-500", bg: "bg-zinc-800/50 border-zinc-700/50",
    bar: "bg-zinc-700",
    glow: "",
  };
}

// 업체 카드 색상 순환
const cardAccents = [
  { border: "hover:border-emerald-500/40", top: "from-emerald-500/5" },
  { border: "hover:border-cyan-500/40",    top: "from-cyan-500/5" },
  { border: "hover:border-violet-500/40",  top: "from-violet-500/5" },
  { border: "hover:border-pink-500/40",    top: "from-pink-500/5" },
];

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: brands } = await supabase
    .from("brands")
    .select(`id, name, description, content_plan, logo_url,
      fabrics(id, swatch_url, color_map_url, normal_map_url,
              reflection_map_url, transparency_map_url, draping_url, virtual_mapping_url)`)
    .order("created_at", { ascending: true });

  const allBrands = brands ?? [];

  const totalFabrics = allBrands.reduce((s, b) => s + (b.fabrics?.length ?? 0), 0);
  const completedBrands = allBrands.filter(b => {
    const fs = b.fabrics ?? [];
    return fs.length > 0 && fs.every((f: any) => MAP_FIELDS.every(k => f[k]));
  }).length;
  const overallPct = totalFabrics === 0 ? 0 : Math.round(
    allBrands.reduce((s, b) => {
      const fs = b.fabrics ?? [];
      return s + fs.reduce((ss: number, f: any) => ss + MAP_FIELDS.filter(k => f[k]).length / MAP_FIELDS.length, 0);
    }, 0) / Math.max(totalFabrics, 1) * 100
  );

  const stats = [
    { label: "참여 업체", value: allBrands.length, sub: "총 16개사", gradient: "from-emerald-500/20 to-emerald-500/5", border: "border-emerald-500/20", text: "text-emerald-400" },
    { label: "등록 소재", value: totalFabrics, sub: "원단 샘플", gradient: "from-cyan-500/20 to-cyan-500/5", border: "border-cyan-500/20", text: "text-cyan-400" },
    { label: "완료 업체", value: completedBrands, sub: "100% 완성", gradient: "from-violet-500/20 to-violet-500/5", border: "border-violet-500/20", text: "text-violet-400" },
    { label: "전체 진행률", value: `${overallPct}%`, sub: "디지털화 완성도", gradient: "from-pink-500/20 to-pink-500/5", border: "border-pink-500/20", text: "text-pink-400" },
  ];

  return (
    <div className="p-8">
      {/* 헤더 */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          <h1 className="text-2xl font-bold text-white">텍스타일 디지털화 현황</h1>
        </div>
        <p className="text-zinc-500 mt-1 pl-7">경기섬유산업연합회 · 참여 업체 소재 디지털 컨텐츠 제작 현황</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, sub, gradient, border, text }) => (
          <div key={label} className={`relative rounded-xl p-5 bg-gradient-to-br ${gradient} border ${border} overflow-hidden`}>
            <p className="text-zinc-400 text-sm mb-1">{label}</p>
            <p className={`text-3xl font-bold ${text}`}>{value}</p>
            <p className="text-zinc-600 text-xs mt-1">{sub}</p>
          </div>
        ))}
      </div>

      {/* 전체 진행 바 */}
      <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-5 mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-white font-semibold text-sm">전체 디지털화 진행률</span>
          <span className="text-xl font-bold text-white">{overallPct}%</span>
        </div>
        <div className="w-full bg-zinc-800 rounded-full h-2.5">
          <div
            className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 rounded-full h-2.5 transition-all"
            style={{ width: `${overallPct}%` }}
          />
        </div>
        <p className="text-zinc-600 text-xs mt-2">{completedBrands}개사 완료 · 전체 {allBrands.length}개사 · 소재 {totalFabrics}종</p>
      </div>

      {/* 업체 카드 그리드 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allBrands.map((brand, idx) => {
          const fabrics = brand.fabrics ?? [];
          const fabricCount = fabrics.length;
          const avgPct = fabricCount === 0 ? 0 : Math.round(
            fabrics.reduce((s: number, f: any) => s + MAP_FIELDS.filter(k => f[k]).length / MAP_FIELDS.length * 100, 0) / fabricCount
          );
          const status = getStatus(fabricCount === 0 ? 0 : avgPct);
          const StatusIcon = status.icon;
          const accent = cardAccents[idx % cardAccents.length];

          return (
            <Link key={brand.id} href={`/dashboard/company/${brand.id}`}>
              <div className={`relative bg-zinc-900 border border-zinc-800/80 ${accent.border} rounded-xl p-5 transition-all cursor-pointer group h-full hover:bg-zinc-800/50 hover:shadow-lg ${status.glow} overflow-hidden`}>
                {/* 상단 그라디언트 */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${accent.top} to-transparent`} />

                <div className="flex items-center justify-between mb-3">
                  <span className="text-zinc-600 text-xs font-mono">#{String(idx + 1).padStart(2, "0")}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${status.bg} ${status.text}`}>
                    {planLabel[brand.content_plan ?? "plan_a"]}
                  </span>
                </div>

                <div className="w-11 h-11 rounded-xl bg-zinc-800 border border-white/5 flex items-center justify-center mb-3 overflow-hidden">
                  {brand.logo_url
                    ? <img src={brand.logo_url} alt={brand.name} className="w-full h-full object-cover" />
                    : <Layers className="w-5 h-5 text-zinc-600" />}
                </div>

                <h3 className="text-white font-semibold text-sm leading-tight mb-1">{brand.name}</h3>
                {brand.description && (
                  <p className="text-zinc-600 text-xs mb-3 line-clamp-1">{brand.description}</p>
                )}

                <p className="text-zinc-500 text-xs mb-3">소재 {fabricCount}종</p>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className={`flex items-center gap-1 ${status.text}`}>
                      <StatusIcon className="w-3 h-3" />
                      {status.label}
                    </span>
                    <span className="text-zinc-500">{fabricCount === 0 ? "—" : `${avgPct}%`}</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-1.5">
                    <div
                      className={`rounded-full h-1.5 transition-all ${status.bar}`}
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
