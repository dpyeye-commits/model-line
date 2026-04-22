import { createClient } from "@/lib/supabase/server";
import { CatalogGrid } from "./catalog-grid";
import { SectionHeader } from "@/components/section-header";
import { BookOpen, CheckCircle2, Layers, Clock } from "lucide-react";

const MAP_FIELDS = [
  "swatch_url", "color_map_url", "normal_map_url", "reflection_map_url",
  "transparency_map_url", "draping_url", "virtual_mapping_url",
];

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
        <SectionHeader title="소재 카탈로그" subtitle="등록된 전체 소재의 디지털 컨텐츠를 확인하세요" icon={BookOpen} color="pink" />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900 border border-white/5 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-4 h-4 text-zinc-400" />
            <p className="text-zinc-400 text-sm">전체 소재</p>
          </div>
          <p className="text-3xl font-bold text-white">{list.length}</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-500/10 to-zinc-900 border border-emerald-500/20 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <p className="text-zinc-400 text-sm">완전 디지털화</p>
          </div>
          <p className="text-3xl font-bold text-emerald-400">{completedList.length}</p>
        </div>
        <div className="bg-gradient-to-br from-amber-500/10 to-zinc-900 border border-amber-500/20 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <p className="text-zinc-400 text-sm">진행중</p>
          </div>
          <p className="text-3xl font-bold text-amber-400">{list.length - completedList.length}</p>
        </div>
      </div>

      <CatalogGrid fabrics={list} />
    </div>
  );
}
