import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Shirt, Image, TrendingUp, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getMyBrand } from "./actions";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const brand = await getMyBrand();

  let lineCount = 0;
  let fabricCount = 0;

  if (brand) {
    const [{ count: lc }, { count: fc }] = await Promise.all([
      supabase.from("product_lines").select("*", { count: "exact", head: true }).eq("brand_id", brand.id),
      supabase.from("fabrics").select("*", { count: "exact", head: true }).eq("brand_id", brand.id),
    ]);
    lineCount = lc ?? 0;
    fabricCount = fc ?? 0;
  }

  const stats = [
    { label: "제품 라인", value: String(lineCount), icon: Package, desc: "등록된 라인" },
    { label: "소재", value: String(fabricCount), icon: Shirt, desc: "소재 라이브러리" },
    { label: "미디어", value: "0", icon: Image, desc: "업로드된 파일" },
    { label: "조회수", value: "0", icon: TrendingUp, desc: "이번 달" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">대시보드</h1>
        <p className="text-zinc-400 mt-1">
          {brand ? `${brand.name} · 브랜드 현황` : "브랜드를 설정하세요"}
        </p>
      </div>

      {!brand && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5 mb-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
          <div className="flex-1">
            <p className="text-amber-300 font-medium text-sm">브랜드 프로필이 없습니다</p>
            <p className="text-amber-400/70 text-sm mt-0.5">제품 라인을 등록하려면 먼저 브랜드를 설정하세요.</p>
          </div>
          <Link href="/dashboard/brand/new">
            <Button size="sm" className="bg-amber-500 hover:bg-amber-400 text-zinc-950 shrink-0">설정하기</Button>
          </Link>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, desc }) => (
          <Card key={label} className="bg-zinc-900 border-zinc-800 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-zinc-400 text-sm">{label}</span>
              <Icon className="w-4 h-4 text-zinc-500" />
            </div>
            <div className="text-3xl font-bold text-white">{value}</div>
            <div className="text-zinc-500 text-xs mt-1">{desc}</div>
          </Card>
        ))}
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-white font-semibold mb-4">빠른 시작</h2>
        <div className="space-y-3 text-sm text-zinc-400">
          <div className="flex items-center gap-3">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${brand ? "bg-green-500/20 text-green-400" : "bg-zinc-800 text-white"}`}>
              {brand ? "✓" : "1"}
            </span>
            {brand ? (
              <span className="text-zinc-500 line-through">브랜드 프로필 설정</span>
            ) : (
              <Link href="/dashboard/brand/new" className="text-white underline">브랜드 프로필 설정하기</Link>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs text-white">2</span>
            <Link href="/dashboard/products/new" className="hover:text-white transition-colors">첫 제품 라인 등록하기 →</Link>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs text-white">3</span>
            <Link href="/dashboard/fabrics/new" className="hover:text-white transition-colors">소재 라이브러리 구성하기 →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
