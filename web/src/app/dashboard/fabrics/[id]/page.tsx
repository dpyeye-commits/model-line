import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { deleteFabric } from "../../actions";
import { FabricMapSection } from "./map-section";

const planLabel: Record<string, string> = {
  plan_a: "1안 (원단 모델링 5종)",
  plan_b: "2안 (원단 모델링 10종 + 의상 모델링)",
};

const MAP_FIELDS: { field: string; label: string; hint: string }[] = [
  { field: "swatch_url",           label: "실물 스와치 이미지",   hint: "JPG, PNG" },
  { field: "color_map_url",        label: "색상맵 (Color Map)",    hint: "PNG, TIF" },
  { field: "normal_map_url",       label: "노말맵 (Normal Map)",   hint: "PNG, TIF" },
  { field: "reflection_map_url",   label: "반사맵 (Reflection)",   hint: "PNG, TIF" },
  { field: "transparency_map_url", label: "투명맵 (Transparency)", hint: "PNG, TIF" },
  { field: "draping_url",          label: "드레이핑 이미지",       hint: "JPG, PNG" },
  { field: "virtual_mapping_url",  label: "가상맵핑 이미지",       hint: "JPG, PNG" },
];

export default async function FabricDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: fabric } = await supabase
    .from("fabrics")
    .select("*")
    .eq("id", id)
    .single();

  if (!fabric) notFound();

  const completed = MAP_FIELDS.filter(f => fabric[f.field]).length;

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/dashboard/fabrics">
          <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white">{fabric.name}</h1>
            <Badge className="bg-zinc-800 text-zinc-300 border-zinc-700">
              {planLabel[fabric.content_plan ?? "plan_a"]}
            </Badge>
          </div>
          <p className="text-zinc-400 text-sm mt-0.5">
            디지털 컨텐츠 완성도: {completed}/{MAP_FIELDS.length}
          </p>
        </div>
        <form action={deleteFabric.bind(null, fabric.id)}>
          <button type="submit" className="text-zinc-600 hover:text-red-400 transition-colors p-2">
            <Trash2 className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* 진행 바 */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs text-zinc-500 mb-1.5">
          <span>디지털화 진행률</span>
          <span>{Math.round((completed / MAP_FIELDS.length) * 100)}%</span>
        </div>
        <div className="w-full bg-zinc-800 rounded-full h-1.5">
          <div
            className="bg-white rounded-full h-1.5 transition-all"
            style={{ width: `${(completed / MAP_FIELDS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* 디지털 맵 업로드 */}
      <div className="space-y-4 mb-8">
        <h2 className="text-white font-semibold">디지털 컨텐츠 업로드</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {MAP_FIELDS.map(({ field, label, hint }) => (
            <FabricMapSection
              key={field}
              fabricId={id}
              field={field}
              label={label}
              hint={hint}
              currentUrl={fabric[field] ?? null}
            />
          ))}
        </div>
      </div>

      {/* 기본 정보 */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
        <h2 className="text-white font-semibold mb-4">소재 기본 정보</h2>
        <div className="grid grid-cols-2 gap-y-3 text-sm">
          {[
            ["혼방률", fabric.composition ?? "—"],
            ["중량", fabric.weight ? `${fabric.weight} g/m²` : "—"],
            ["폭", fabric.width ? `${fabric.width} cm` : "—"],
            ["가공 방식", fabric.finish ?? "—"],
          ].map(([k, v]) => (
            <div key={k} className="flex gap-2">
              <span className="text-zinc-500 w-20">{k}</span>
              <span className="text-zinc-200">{v}</span>
            </div>
          ))}
        </div>
        {fabric.notes && (
          <p className="text-zinc-400 text-sm mt-4 leading-relaxed">{fabric.notes}</p>
        )}
      </div>
    </div>
  );
}
