"use client";

import Link from "next/link";
import { Shirt, ChevronRight, CheckCircle2 } from "lucide-react";

const MAP_FIELDS = [
  "swatch_url", "color_map_url", "normal_map_url", "reflection_map_url",
  "transparency_map_url", "draping_url", "virtual_mapping_url"
];

const planLabel: Record<string, string> = {
  plan_a: "1안",
  plan_b: "2안",
};

interface FabricCardProps {
  fabric: {
    id: string;
    name: string;
    composition?: string | null;
    weight?: string | null;
    finish?: string | null;
    content_plan?: string | null;
    swatch_url?: string | null;
    color_map_url?: string | null;
    normal_map_url?: string | null;
    reflection_map_url?: string | null;
    transparency_map_url?: string | null;
    draping_url?: string | null;
    virtual_mapping_url?: string | null;
    [key: string]: any;
  };
}

export function FabricCard({ fabric }: FabricCardProps) {
  const completed = MAP_FIELDS.filter(f => fabric[f]).length;
  const pct = Math.round((completed / MAP_FIELDS.length) * 100);

  return (
    <Link href={`/dashboard/fabrics/${fabric.id}`}>
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-600 transition-colors cursor-pointer">
        {/* 스와치 이미지 */}
        <div className="w-full h-32 bg-zinc-800 flex items-center justify-center">
          {fabric.swatch_url ? (
            <img src={fabric.swatch_url} alt={fabric.name} className="w-full h-full object-cover" />
          ) : (
            <Shirt className="w-8 h-8 text-zinc-600" />
          )}
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-white font-medium text-sm">{fabric.name}</h3>
              <span className="text-zinc-500 text-xs">{planLabel[fabric.content_plan ?? "plan_a"]}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-600 mt-0.5" />
          </div>
          {fabric.composition && <p className="text-zinc-400 text-xs mb-3">혼방: {fabric.composition}</p>}

          {/* 진행 바 */}
          <div>
            <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
              <span>디지털화</span>
              <span className="flex items-center gap-1">
                {completed === MAP_FIELDS.length && <CheckCircle2 className="w-3 h-3 text-green-400" />}
                {pct}%
              </span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-1">
              <div
                className={`rounded-full h-1 transition-all ${pct === 100 ? "bg-green-400" : "bg-white"}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
