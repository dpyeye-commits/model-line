import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLink, Layers, CheckCircle2, MapPin } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { CatalogPublicGrid } from "./catalog-grid";
import { SocialSidebar } from "@/components/social-sidebar";
import { BottomBanner } from "@/components/bottom-banner";
import { GTIALogoIcon } from "@/components/gtia-logo";

const MAP_FIELDS = [
  "swatch_url","color_map_url","normal_map_url","reflection_map_url",
  "transparency_map_url","draping_url","virtual_mapping_url",
];

export default async function PublicCatalogPage() {
  const supabase = await createClient();

  const { data: fabrics } = await supabase
    .from("fabrics")
    .select(`
      id, name, composition, weight, content_plan,
      swatch_url, color_map_url, normal_map_url, reflection_map_url,
      transparency_map_url, draping_url, virtual_mapping_url,
      brands ( id, name, logo_url, description )
    `)
    .order("created_at", { ascending: false });

  const list = fabrics ?? [];
  const completedCount = list.filter(f => MAP_FIELDS.every(k => (f as any)[k])).length;

  // 업체별 그룹
  const brandMap = new Map<string, { name: string; logo_url: string | null; count: number }>();
  list.forEach((f: any) => {
    if (!f.brands) return;
    const b = brandMap.get(f.brands.id) ?? { name: f.brands.name, logo_url: f.brands.logo_url, count: 0 };
    b.count++;
    brandMap.set(f.brands.id, b);
  });

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* 헤더 */}
      <nav className="border-b border-zinc-800 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <GTIALogoIcon size={36} />
          <div>
            <p className="text-white font-bold text-sm leading-tight">경기섬유산업연합회</p>
            <p className="text-zinc-500 text-xs leading-tight">텍스타일 디지털 카탈로그</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a href="http://www.gtia.or.kr" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 text-zinc-500 hover:text-zinc-300 text-xs transition-colors">
            <ExternalLink className="w-3 h-3" /> GTIA 공식 홈페이지
          </a>
          <Link href="/auth/login">
            <Button variant="ghost" size="sm" className="text-zinc-300 hover:text-white">관리자 로그인</Button>
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* 타이틀 */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-zinc-500" />
            <span className="text-zinc-500 text-sm">경기도 양주·포천·동두천 · 글로벌 섬유·가죽·패션산업특구</span>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-1 h-10 rounded-full bg-gradient-to-b from-violet-400 to-pink-400 shrink-0" />
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-300 via-pink-300 to-orange-300 bg-clip-text text-transparent">
                텍스타일 디지털 카탈로그
              </h1>
              <p className="text-zinc-500 mt-1">경기섬유산업연합회 참여 업체 원단 소재 디지털 컨텐츠 공개 카탈로그</p>
            </div>
          </div>
        </div>

        {/* 통계 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "참여 업체", value: brandMap.size, unit: "개사", color: "text-violet-400", grad: "from-violet-500/10", border: "border-violet-500/20" },
            { label: "등록 소재", value: list.length, unit: "종", color: "text-white", grad: "from-zinc-700/30", border: "border-white/5" },
            { label: "디지털화 완료", value: completedCount, unit: "종", color: "text-emerald-400", grad: "from-emerald-500/10", border: "border-emerald-500/20" },
            { label: "진행중", value: list.length - completedCount, unit: "종", color: "text-amber-400", grad: "from-amber-500/10", border: "border-amber-500/20" },
          ].map(({ label, value, unit, color, grad, border }) => (
            <div key={label} className={`bg-gradient-to-br ${grad} to-zinc-900 border ${border} rounded-xl p-4`}>
              <p className="text-zinc-500 text-xs mb-1">{label}</p>
              <p className={`text-2xl font-bold ${color}`}>{value}<span className="text-sm ml-1 font-normal text-zinc-500">{unit}</span></p>
            </div>
          ))}
        </div>

        {/* 참여 업체 칩 */}
        {brandMap.size > 0 && (
          <div className="mb-8">
            <p className="text-zinc-500 text-xs mb-3">참여 업체</p>
            <div className="flex flex-wrap gap-2">
              {Array.from(brandMap.entries()).map(([id, b]) => (
                <div key={id} className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 rounded-full px-3 py-1">
                  {b.logo_url
                    ? <img src={b.logo_url} alt={b.name} className="w-4 h-4 rounded-full object-cover" />
                    : <Layers className="w-3.5 h-3.5 text-zinc-500" />}
                  <span className="text-zinc-300 text-xs">{b.name}</span>
                  <span className="text-zinc-600 text-xs">{b.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 소재 그리드 (클라이언트 검색) */}
        <CatalogPublicGrid fabrics={list} />
      </div>

      {/* 푸터 */}
      <footer className="border-t border-zinc-800 px-8 py-6 mt-16">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-white text-sm font-semibold">경기섬유산업연합회 (GTIA)</p>
            <p className="text-zinc-600 text-xs mt-0.5">경기도 양주시 평화로 1215 · 031-850-3651</p>
          </div>
          <a href="http://www.gtia.or.kr" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 text-zinc-500 hover:text-zinc-300 text-xs transition-colors">
            <ExternalLink className="w-3 h-3" /> www.gtia.or.kr
          </a>
        </div>
      </footer>
      <BottomBanner />
      <SocialSidebar />
    </main>
  );
}
