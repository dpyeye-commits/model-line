"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface Brand { id: string; name: string; }

export function FabricFilter({ brands, selected }: { brands: Brand[]; selected: string }) {
  const router = useRouter();
  const sp = useSearchParams();

  function handleChange(brandId: string) {
    const params = new URLSearchParams(sp.toString());
    if (brandId) params.set("brandId", brandId);
    else params.delete("brandId");
    router.push(`/dashboard/fabrics?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <button
        onClick={() => handleChange("")}
        className={`px-3 py-1.5 rounded-full text-xs transition-colors border ${
          !selected
            ? "bg-emerald-600 text-white border-emerald-600"
            : "bg-transparent text-zinc-400 border-zinc-700 hover:border-zinc-500 hover:text-zinc-200"
        }`}
      >
        전체
      </button>
      {brands.map(b => (
        <button
          key={b.id}
          onClick={() => handleChange(b.id)}
          className={`px-3 py-1.5 rounded-full text-xs transition-colors border ${
            selected === b.id
              ? "bg-emerald-600 text-white border-emerald-600"
              : "bg-transparent text-zinc-400 border-zinc-700 hover:border-zinc-500 hover:text-zinc-200"
          }`}
        >
          {b.name}
        </button>
      ))}
    </div>
  );
}
