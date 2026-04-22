import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Shirt } from "lucide-react";

export default function FabricsPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">소재 라이브러리</h1>
          <p className="text-zinc-400 mt-1">원단·소재 정보를 디지털로 관리하세요</p>
        </div>
        <Link href="/dashboard/fabrics/new">
          <Button className="bg-white text-zinc-950 hover:bg-zinc-100 gap-2">
            <Plus className="w-4 h-4" />
            소재 추가
          </Button>
        </Link>
      </div>

      <div className="border border-dashed border-zinc-700 rounded-xl p-16 text-center">
        <Shirt className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
        <h3 className="text-white font-medium mb-2">등록된 소재가 없습니다</h3>
        <p className="text-zinc-400 text-sm mb-6">
          원단 스와치와 디지털 맵 파일을 등록해보세요
        </p>
        <Link href="/dashboard/fabrics/new">
          <Button className="bg-white text-zinc-950 hover:bg-zinc-100 gap-2">
            <Plus className="w-4 h-4" />
            소재 추가
          </Button>
        </Link>
      </div>
    </div>
  );
}
