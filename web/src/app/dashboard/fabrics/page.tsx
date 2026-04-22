import Link from "next/link";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Shirt } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { createClient } from "@/lib/supabase/server";
import { FabricCard } from "./fabric-card";
import { FabricFilter } from "./filter";

export default async function FabricsPage({
  searchParams,
}: {
  searchParams: Promise<{ brandId?: string }>;
}) {
  const { brandId } = await searchParams;
  const supabase = await createClient();

  // 업체 목록
  const { data: brands } = await supabase
    .from("brands")
    .select("id, name")
    .order("name");

  // 소재 목록 (업체 필터)
  let query = supabase
    .from("fabrics")
    .select(`id, name, composition, weight, finish, content_plan,
      swatch_url, color_map_url, normal_map_url, reflection_map_url,
      transparency_map_url, draping_url, virtual_mapping_url,
      brands(id, name)`)
    .order("created_at", { ascending: false });

  if (brandId) query = query.eq("brand_id", brandId);

  const { data: fabrics } = await query;
  const list = fabrics ?? [];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <SectionHeader title="소재 라이브러리" subtitle={`총 ${list.length}종의 원단 소재`} icon={Shirt} color="cyan" />
        <Link href="/dashboard/fabrics/new">
          <Button className="bg-emerald-600 text-white hover:bg-emerald-500 gap-2">
            <Plus className="w-4 h-4" />소재 추가
          </Button>
        </Link>
      </div>

      {/* 업체 필터 */}
      <Suspense fallback={null}>
        <FabricFilter brands={brands ?? []} selected={brandId ?? ""} />
      </Suspense>

      {list.length === 0 ? (
        <div className="border border-dashed border-zinc-700 rounded-xl p-16 text-center mt-6">
          <p className="text-white font-medium mb-2">등록된 소재가 없습니다</p>
          <Link href="/dashboard/fabrics/new">
            <Button className="bg-emerald-600 text-white hover:bg-emerald-500 gap-2 mt-4">
              <Plus className="w-4 h-4" />소재 추가
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
          {list.map((fabric: any) => (
            <FabricCard key={fabric.id} fabric={fabric} brandName={fabric.brands?.name} />
          ))}
        </div>
      )}
    </div>
  );
}
