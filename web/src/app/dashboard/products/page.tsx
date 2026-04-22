import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Package, ChevronRight } from "lucide-react";
import { getProductLines } from "../actions";
import { SectionHeader } from "@/components/section-header";

const statusMap: Record<string, { label: string; className: string }> = {
  draft: { label: "초안", className: "bg-zinc-800 text-zinc-300 border-zinc-700" },
  active: { label: "활성", className: "bg-green-500/10 text-green-400 border-green-500/30" },
  archived: { label: "보관", className: "bg-zinc-700 text-zinc-400 border-zinc-600" },
};

export default async function ProductsPage() {
  const lines = await getProductLines();

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <SectionHeader title="제품 라인" subtitle="시즌별 컬렉션을 관리하세요" icon={Package} color="violet" />
        <Link href="/dashboard/products/new">
          <Button className="bg-emerald-600 text-white hover:bg-emerald-500 gap-2">
            <Plus className="w-4 h-4" />새 라인 추가
          </Button>
        </Link>
      </div>

      {lines.length === 0 ? (
        <div className="border border-dashed border-zinc-700 rounded-xl p-16 text-center">
          <Package className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-white font-medium mb-2">등록된 제품 라인이 없습니다</h3>
          <p className="text-zinc-400 text-sm mb-6">첫 번째 시즌 컬렉션을 등록해보세요</p>
          <Link href="/dashboard/products/new">
            <Button className="bg-emerald-600 text-white hover:bg-emerald-500 gap-2">
              <Plus className="w-4 h-4" />제품 라인 추가
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {lines.map((line: any) => {
            const s = statusMap[line.status] ?? statusMap.draft;
            return (
              <Link key={line.id} href={`/dashboard/products/${line.id}`}>
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex items-center justify-between hover:border-zinc-600 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-zinc-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium">{line.name}</span>
                        <Badge className={s.className}>{s.label}</Badge>
                      </div>
                      <p className="text-zinc-500 text-sm mt-0.5">
                        {line.seasons?.name ?? "시즌 미정"} · {line.categories?.name ?? "카테고리 미정"}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-600" />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
