"use client";

import { useRouter, useSearchParams } from "next/navigation";

const TABS = [
  { key: "fabrics",  label: "원단 라이브러리" },
  { key: "garments", label: "의상 모델링" },
  { key: "library",  label: "회사 라이브러리" },
  { key: "videos",   label: "홍보영상" },
];

export function TabNav({ brandId }: { brandId: string }) {
  const sp = useSearchParams();
  const router = useRouter();
  const active = sp.get("tab") ?? "fabrics";

  return (
    <div className="flex gap-1 border-b border-zinc-800 mb-6">
      {TABS.map(t => (
        <button
          key={t.key}
          onClick={() => router.push(`/dashboard/company/${brandId}?tab=${t.key}`)}
          className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
            active === t.key
              ? "text-white border-white"
              : "text-zinc-500 border-transparent hover:text-zinc-300"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
