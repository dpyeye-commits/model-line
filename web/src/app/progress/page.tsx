import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ExternalLink, CheckCircle2, Clock, AlertCircle, Layers } from "lucide-react";
import { SocialSidebar } from "@/components/social-sidebar";
import { BottomBanner } from "@/components/bottom-banner";
import { GTIALogoIcon } from "@/components/gtia-logo";

const MAP_FIELDS = [
  "swatch_url","color_map_url","normal_map_url","reflection_map_url",
  "transparency_map_url","draping_url","virtual_mapping_url",
];

const planLabel: Record<string, string> = { plan_a: "1안", plan_b: "2안" };

export default async function ProgressPage() {
  const supabase = await createClient();

  const { data: brands } = await supabase
    .from("brands")
    .select(`id, name, description, content_plan, logo_url,
      fabrics(id, swatch_url, color_map_url, normal_map_url, reflection_map_url,
              transparency_map_url, draping_url, virtual_mapping_url)`)
    .order("created_at", { ascending: true });

  const list = brands ?? [];

  const totalFabrics = list.reduce((s, b) => s + (b.fabrics?.length ?? 0), 0);
  const totalItems = totalFabrics * MAP_FIELDS.length;
  const doneItems = list.reduce((s, b) =>
    s + (b.fabrics ?? []).reduce((ss: number, f: any) =>
      ss + MAP_FIELDS.filter(k => f[k]).length, 0), 0);
  const overallPct = totalItems === 0 ? 0 : Math.round((doneItems / totalItems) * 100);
  const completedBrands = list.filter(b => {
    const fs = b.fabrics ?? [];
    return fs.length > 0 && fs.every((f: any) => MAP_FIELDS.every(k => f[k]));
  }).length;

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* 헤더 */}
      <nav className="border-b border-zinc-800 px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <GTIALogoIcon size={36} />
          <div>
            <p className="text-white font-bold text-sm leading-tight">경기섬유산업연합회</p>
            <p className="text-zinc-500 text-xs leading-tight">텍스타일 디지털화 진행 현황</p>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/catalog" className="text-zinc-400 hover:text-white text-sm transition-colors">소재 카탈로그</Link>
          <Link href="/auth/login" className="text-zinc-400 hover:text-white text-sm transition-colors">관리자 로그인</Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-8 py-12">
        <div className="mb-10">
          <div className="flex items-start gap-3">
            <div className="w-1 h-10 rounded-full bg-gradient-to-b from-emerald-400 to-cyan-400 shrink-0 mt-1" />
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                실시간 디지털화 진행 현황
              </h1>
              <p className="text-zinc-500 mt-1">경기섬유산업연합회 16개 참여 업체 텍스타일 디지털 컨텐츠 제작 현황</p>
            </div>
          </div>
        </div>

        {/* 전체 통계 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "참여 업체", value: list.length, unit: "개사" },
            { label: "등록 소재", value: totalFabrics, unit: "종" },
            { label: "완료 업체", value: completedBrands, unit: "개사", highlight: true },
            { label: "전체 진행률", value: `${overallPct}%`, unit: "", highlight: overallPct > 0 },
          ].map(({ label, value, unit, highlight }) => (
            <div key={label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <p className="text-zinc-500 text-xs mb-1">{label}</p>
              <p className={`text-2xl font-bold ${highlight ? "text-green-400" : "text-white"}`}>
                {value}<span className="text-sm font-normal text-zinc-500 ml-1">{unit}</span>
              </p>
            </div>
          ))}
        </div>

        {/* 전체 진행 바 */}
        <div className="bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 border border-emerald-500/15 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-0.5 h-5 rounded-full bg-gradient-to-b from-emerald-400 to-cyan-400" />
              <span className="text-white font-semibold">전체 디지털화 진행률</span>
            </div>
            <span className="text-2xl font-bold text-white">{overallPct}%</span>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-3 mb-2">
            <div
              className="bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full h-3 transition-all"
              style={{ width: `${overallPct}%` }}
            />
          </div>
          <p className="text-zinc-500 text-xs">{doneItems} / {totalItems} 항목 완료 · 소재 {totalFabrics}종 등록</p>
        </div>

        {/* 업체별 현황 테이블 */}
        <div className="bg-zinc-900/80 border border-white/5 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/5 bg-gradient-to-r from-violet-500/5 to-transparent">
            <div className="flex items-center gap-2">
              <div className="w-0.5 h-4 rounded-full bg-gradient-to-b from-violet-400 to-pink-400" />
              <h2 className="text-white font-semibold text-sm">업체별 진행 현황</h2>
            </div>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left px-5 py-3 text-zinc-500 font-medium w-8">#</th>
                <th className="text-left px-5 py-3 text-zinc-500 font-medium">업체명</th>
                <th className="text-left px-5 py-3 text-zinc-500 font-medium">방안</th>
                <th className="text-left px-5 py-3 text-zinc-500 font-medium">소재</th>
                <th className="text-left px-5 py-3 text-zinc-500 font-medium w-40">진행률</th>
                <th className="text-left px-5 py-3 text-zinc-500 font-medium">상태</th>
              </tr>
            </thead>
            <tbody>
              {list.map((brand: any, idx) => {
                const fabrics = brand.fabrics ?? [];
                const pct = fabrics.length === 0 ? 0 : Math.round(
                  fabrics.reduce((s: number, f: any) =>
                    s + MAP_FIELDS.filter(k => f[k]).length / MAP_FIELDS.length, 0)
                  / fabrics.length * 100
                );
                const StatusIcon = pct === 100 ? CheckCircle2 : pct > 0 ? Clock : AlertCircle;
                const statusColor = pct === 100 ? "text-green-400" : pct > 0 ? "text-amber-400" : "text-zinc-600";
                const statusLabel = pct === 100 ? "완료" : pct > 0 ? "진행중" : "미시작";
                return (
                  <tr key={brand.id} className="border-b border-zinc-800/50">
                    <td className="px-5 py-3 text-zinc-600 font-mono text-xs">{String(idx+1).padStart(2,"0")}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        {brand.logo_url
                          ? <img src={brand.logo_url} className="w-6 h-6 rounded object-cover" alt="" />
                          : <div className="w-6 h-6 rounded bg-zinc-800 flex items-center justify-center"><Layers className="w-3 h-3 text-zinc-600" /></div>}
                        <span className="text-white font-medium">{brand.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="bg-zinc-800 text-zinc-400 text-xs px-2 py-0.5 rounded-full">
                        {planLabel[brand.content_plan ?? "plan_a"]}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-zinc-300">{fabrics.length}종</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-zinc-800 rounded-full h-1.5">
                          <div
                            className={`rounded-full h-1.5 ${pct===100?"bg-green-400":pct>0?"bg-amber-400":"bg-zinc-700"}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-zinc-400 text-xs w-8 text-right">{pct}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`flex items-center gap-1 text-xs ${statusColor}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {statusLabel}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <footer className="border-t border-zinc-800 px-8 py-6 mt-12">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <p className="text-zinc-600 text-xs">© 2026 경기섬유산업연합회 · 경기도 양주시 평화로 1215 · 031-850-3651</p>
          <a href="http://www.gtia.or.kr" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 text-zinc-600 hover:text-zinc-400 text-xs transition-colors">
            <ExternalLink className="w-3 h-3" /> www.gtia.or.kr
          </a>
        </div>
      </footer>
      <BottomBanner />
      <SocialSidebar />
    </main>
  );
}
