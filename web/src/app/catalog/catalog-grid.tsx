"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Layers, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";

const MAP_FIELDS = [
  "swatch_url","color_map_url","normal_map_url","reflection_map_url",
  "transparency_map_url","draping_url","virtual_mapping_url",
];
const MAP_LABELS: Record<string, string> = {
  swatch_url:"스와치", color_map_url:"색상맵", normal_map_url:"노말맵",
  reflection_map_url:"반사맵", transparency_map_url:"투명맵",
  draping_url:"드레이핑", virtual_mapping_url:"가상맵핑",
};

export function CatalogPublicGrid({ fabrics }: { fabrics: any[] }) {
  const [query, setQuery] = useState("");
  const [filterComplete, setFilterComplete] = useState<"all" | "done" | "ing">("all");

  const filtered = fabrics.filter(f => {
    const done = MAP_FIELDS.filter(k => f[k]).length;
    const matchQuery = !query.trim() ||
      f.name?.toLowerCase().includes(query.toLowerCase()) ||
      f.brands?.name?.toLowerCase().includes(query.toLowerCase()) ||
      f.composition?.toLowerCase().includes(query.toLowerCase());
    const matchFilter =
      filterComplete === "all" ||
      (filterComplete === "done" && done === MAP_FIELDS.length) ||
      (filterComplete === "ing" && done < MAP_FIELDS.length);
    return matchQuery && matchFilter;
  });

  return (
    <>
      {/* 검색 + 필터 */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <Input
            placeholder="소재명, 업체명, 혼방률 검색..."
            className="bg-zinc-900 border-zinc-700 text-white pl-9"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {(["all","done","ing"] as const).map(v => (
            <button
              key={v}
              onClick={() => setFilterComplete(v)}
              className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${
                filterComplete === v
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-zinc-900 border-zinc-700 text-zinc-400 hover:text-white"
              }`}
            >
              {v === "all" ? "전체" : v === "done" ? "✓ 완료" : "진행중"}
            </button>
          ))}
        </div>
      </div>

      <p className="text-zinc-600 text-xs mb-4">{filtered.length}종 표시 중</p>

      {filtered.length === 0 ? (
        <div className="border border-dashed border-zinc-700 rounded-xl p-24 text-center">
          <Layers className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <p className="text-white font-medium">
            {query ? `"${query}" 검색 결과가 없습니다` : "등록된 소재가 없습니다"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((fabric: any) => {
            const done = MAP_FIELDS.filter(k => fabric[k]).length;
            const pct = Math.round((done / MAP_FIELDS.length) * 100);
            const complete = done === MAP_FIELDS.length;
            return (
              <div key={fabric.id} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-600 transition-colors">
                <div className="w-full h-36 bg-zinc-800 relative">
                  {fabric.swatch_url
                    ? <img src={fabric.swatch_url} alt={fabric.name} className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center"><Layers className="w-8 h-8 text-zinc-600" /></div>}
                  {complete && (
                    <div className="absolute top-2 right-2 bg-green-500/20 border border-green-500/40 rounded-full p-1">
                      <CheckCircle2 className="w-3 h-3 text-green-400" />
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-zinc-500 text-xs mb-0.5">{fabric.brands?.name}</p>
                  <p className="text-white text-sm font-medium leading-tight mb-2">{fabric.name}</p>
                  {fabric.composition && <p className="text-zinc-500 text-xs mb-2">{fabric.composition}</p>}
                  <div className="flex gap-1 flex-wrap mb-2">
                    {MAP_FIELDS.map(k => (
                      <span key={k} className={`text-xs px-1 py-0.5 rounded ${
                        fabric[k] ? "bg-green-500/15 text-green-400" : "bg-zinc-800 text-zinc-700"
                      }`}>
                        {MAP_LABELS[k]}
                      </span>
                    ))}
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-0.5">
                    <div className={`rounded-full h-0.5 ${complete ? "bg-green-400" : "bg-amber-400"}`}
                      style={{ width: `${pct}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
