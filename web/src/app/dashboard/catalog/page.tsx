import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Search, Layers, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";

const MAP_FIELDS = [
  "swatch_url", "color_map_url", "normal_map_url", "reflection_map_url",
  "transparency_map_url", "draping_url", "virtual_mapping_url",
];

const MAP_LABELS: Record<string, string> = {
  swatch_url: "스와치", color_map_url: "색상맵", normal_map_url: "노말맵",
  reflection_map_url: "반사맵", transparency_map_url: "투명맵",
  draping_url: "드레이핑", virtual_mapping_url: "가상맵핑",
};

export default async function CatalogPage() {
  const supabase = await createClient();

  const { data: fabrics } = await supabase
    .from("fabrics")
    .select(`
      id, name, composition, weight, finish, content_plan,
      swatch_url, color_map_url, normal_map_url, reflection_map_url,
      transparency_map_url, draping_url, virtual_mapping_url,
      brands ( id, name, logo_url )
    `)
    .order("created_at", { ascending: false });

  const list = fabrics ?? [];
  const completedList = list.filter(f => MAP_FIELDS.every(k => (f as any)[k]));

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">소재 카탈로그</h1>
        <p className="text-zinc-400 mt-1">등록된 전체 소재의 디지털 컨텐츠를 확인하세요</p>
      </div>

      {/* 통계 */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <p className="text-zinc-400 text-sm">전체 소재</p>
          <p className="text-3xl font-bold text-white mt-1">{list.length}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <p className="text-zinc-400 text-sm">완전 디지털화</p>
          <p className="text-3xl font-bold text-green-400 mt-1">{completedList.length}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <p className="text-zinc-400 text-sm">진행중</p>
          <p className="text-3xl font-bold text-amber-400 mt-1">{list.length - completedList.length}</p>
        </div>
      </div>

      {/* 검색 */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <Input placeholder="소재명, 업체명 검색..." className="bg-zinc-900 border-zinc-700 text-white pl-9" />
      </div>

      {list.length === 0 ? (
        <div className="border border-dashed border-zinc-700 rounded-xl p-16 text-center">
          <Layers className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <p className="text-white font-medium mb-2">등록된 소재가 없습니다</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {list.map((fabric: any) => {
            const done = MAP_FIELDS.filter(k => fabric[k]).length;
            const pct = Math.round((done / MAP_FIELDS.length) * 100);
            const complete = done === MAP_FIELDS.length;

            return (
              <Link key={fabric.id} href={`/dashboard/fabrics/${fabric.id}`}>
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-600 transition-colors cursor-pointer">
                  {/* 스와치 */}
                  <div className="w-full h-40 bg-zinc-800 relative">
                    {fabric.swatch_url ? (
                      <img src={fabric.swatch_url} alt={fabric.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Layers className="w-10 h-10 text-zinc-600" />
                      </div>
                    )}
                    {complete && (
                      <div className="absolute top-2 right-2 bg-green-500/20 border border-green-500/40 rounded-full px-2 py-0.5 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-green-400" />
                        <span className="text-green-400 text-xs">완료</span>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    {/* 업체명 */}
                    <p className="text-zinc-500 text-xs mb-1">{fabric.brands?.name}</p>
                    <h3 className="text-white font-semibold text-sm mb-2">{fabric.name}</h3>

                    {fabric.composition && (
                      <p className="text-zinc-400 text-xs mb-3">{fabric.composition}</p>
                    )}

                    {/* 맵 현황 */}
                    <div className="flex gap-1 flex-wrap mb-3">
                      {MAP_FIELDS.map(k => (
                        <span
                          key={k}
                          className={`text-xs px-1.5 py-0.5 rounded ${
                            fabric[k]
                              ? "bg-green-500/15 text-green-400"
                              : "bg-zinc-800 text-zinc-600"
                          }`}
                        >
                          {MAP_LABELS[k]}
                        </span>
                      ))}
                    </div>

                    {/* 진행 바 */}
                    <div className="w-full bg-zinc-800 rounded-full h-1">
                      <div
                        className={`rounded-full h-1 ${complete ? "bg-green-400" : "bg-amber-400"}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
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
