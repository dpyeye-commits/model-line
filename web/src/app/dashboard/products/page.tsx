import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Package } from "lucide-react";

export default function ProductsPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">제품 라인</h1>
          <p className="text-zinc-400 mt-1">시즌별 컬렉션을 관리하세요</p>
        </div>
        <Link href="/dashboard/products/new">
          <Button className="bg-white text-zinc-950 hover:bg-zinc-100 gap-2">
            <Plus className="w-4 h-4" />
            새 라인 추가
          </Button>
        </Link>
      </div>

      {/* 빈 상태 */}
      <div className="border border-dashed border-zinc-700 rounded-xl p-16 text-center">
        <Package className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
        <h3 className="text-white font-medium mb-2">등록된 제품 라인이 없습니다</h3>
        <p className="text-zinc-400 text-sm mb-6">
          첫 번째 시즌 컬렉션을 등록해보세요
        </p>
        <Link href="/dashboard/products/new">
          <Button className="bg-white text-zinc-950 hover:bg-zinc-100 gap-2">
            <Plus className="w-4 h-4" />
            제품 라인 추가
          </Button>
        </Link>
      </div>
    </div>
  );
}
