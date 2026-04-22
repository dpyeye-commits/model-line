import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Layers, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

const MAP_FIELDS = [
  { key: "swatch_url",           label: "스와치" },
  { key: "color_map_url",        label: "색상맵" },
  { key: "normal_map_url",       label: "노말맵" },
  { key: "reflection_map_url",   label: "반사맵" },
  { key: "transparency_map_url", label: "투명맵" },
  { key: "draping_url",          label: "드레이핑" },
  { key: "virtual_mapping_url",  label: "가상맵핑" },
];

const planLabel: Record<string, string> = {
  plan_a: "1안 (원단 모델링 5종)",
  plan_b: "2안 (원단 모델링 10종 + 의상 모델링)",
};

export default async function CompanyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: brand } = await supabase
    .from("brands")
    .select("*")
    .eq("id", id)
    .single();

  if (!brand) notFound();

  const { data: fabrics } = await supabase
    .from("fabrics")
    .select("*")
    .eq("brand_id", id)
    .order("created_at", { ascending: false });

  const fabricList = fabrics ?? [];
  const totalDone = fabricList.reduce((s, f: any) => {
    return s + MAP_FIELDS.filter(m => f[m.key]).length;
  }, 0);
  const totalPossible = fabricList.length * MAP_FIELDS.length;
  const pct = totalPossible === 0 ? 0 : Math.round((totalDone / totalPossible) * 100);

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white">{brand.name}</h1>
            <Badge className="bg-zinc-800 text-zinc-300 border-zinc-700">
              {planLabel[brand.content_plan ?? "plan_a"]}
            </Badge>
          </div>
          {brand.description && <p className="text-zinc-400 text-sm mt-0.5">{brand.description}</p>}
        </div>
        <Link href={`/dashboard/fabrics/new?brandId=${id}`}>
          <Button className="bg-white text-zinc-950 hover:bg-zinc-100 gap-2">
            <Plus className="w-4 h-4" /> 소재 추가
          </Button>
        </Link>
      </div>

      {/* 진행률 */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-white font-semibold">디지털화 진행률</span>
          <span className="text-2xl font-bold text-white">{pct}%</span>
        </div>
        <div className="w-full bg-zinc-800 rounded-full h-2">
          <div
            className={`rounded-full h-2 transition-all ${pct === 100 ? "bg-green-400" : pct > 0 ? "bg-amber-400" : "bg-zinc-700"}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-zinc-500 text-xs mt-2">{totalDone} / {totalPossible} 항목 완료 · 소재 {fabricList.length}종</p>
      </div>

      {/* 소재 목록 */}
      {fabricList.length === 0 ? (
        <div className="border border-dashed border-zinc-700 rounded-xl p-16 text-center">
          <Layers className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <p className="text-white font-medium mb-2">등록된 소재가 없습니다</p>
          <Link href={`/dashboard/fabrics/new?brandId=${id}`}>
            <Button className="bg-white text-zinc-950 hover:bg-zinc-100 gap-2 mt-4">
              <Plus className="w-4 h-4" /> 소재 추가
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          <h2 className="text-white font-semibold mb-4">소재 목록 ({fabricList.length}종)</h2>
          {fabricList.map((fabric: any) => {
            const done = MAP_FIELDS.filter(m => fabric[m.key]).length;
            const fpct = Math.round((done / MAP_FIELDS.length) * 100);
            return (
              <Link key={fabric.id} href={`/dashboard/fabrics/${fabric.id}`}>
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-zinc-600 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {fabric.swatch_url ? (
                        <img src={fabric.swatch_url} alt={fabric.name} className="w-10 h-10 rounded-lg object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                          <Layers className="w-5 h-5 text-zinc-600" />
                        </div>
                      )}
                      <div>
                        <p className="text-white font-medium text-sm">{fabric.name}</p>
                        {fabric.composition && <p className="text-zinc-500 text-xs">{fabric.composition}</p>}
                      </div>
                    </div>
                    <span className={`text-xs font-medium ${fpct === 100 ? "text-green-400" : fpct > 0 ? "text-amber-400" : "text-zinc-500"}`}>
                      {fpct}%
                    </span>
                  </div>
                  {/* 맵 현황 */}
                  <div className="flex gap-1.5 flex-wrap">
                    {MAP_FIELDS.map(m => (
                      <span
                        key={m.key}
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          fabric[m.key]
                            ? "bg-green-500/15 text-green-400 border border-green-500/30"
                            : "bg-zinc-800 text-zinc-600 border border-zinc-700"
                        }`}
                      >
                        {m.label}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
