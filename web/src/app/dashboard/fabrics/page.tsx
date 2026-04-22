import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Shirt } from "lucide-react";
import { getFabrics } from "../actions";

export default async function FabricsPage() {
  const fabrics = await getFabrics();

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">소재 라이브러리</h1>
          <p className="text-zinc-400 mt-1">원단·소재 정보를 디지털로 관리하세요</p>
        </div>
        <Link href="/dashboard/fabrics/new">
          <Button className="bg-white text-zinc-950 hover:bg-zinc-100 gap-2">
            <Plus className="w-4 h-4" />소재 추가
          </Button>
        </Link>
      </div>

      {fabrics.length === 0 ? (
        <div className="border border-dashed border-zinc-700 rounded-xl p-16 text-center">
          <Shirt className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-white font-medium mb-2">등록된 소재가 없습니다</h3>
          <p className="text-zinc-400 text-sm mb-6">원단 스와치와 디지털 맵 파일을 등록해보세요</p>
          <Link href="/dashboard/fabrics/new">
            <Button className="bg-white text-zinc-950 hover:bg-zinc-100 gap-2">
              <Plus className="w-4 h-4" />소재 추가
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fabrics.map((fabric: any) => (
            <div key={fabric.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-600 transition-colors">
              <div className="w-full h-32 bg-zinc-800 rounded-lg mb-4 flex items-center justify-center">
                {fabric.swatch_url ? (
                  <img src={fabric.swatch_url} alt={fabric.name} className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <Shirt className="w-8 h-8 text-zinc-600" />
                )}
              </div>
              <h3 className="text-white font-medium">{fabric.name}</h3>
              <div className="mt-2 space-y-1">
                {fabric.composition && (
                  <p className="text-zinc-400 text-xs">혼방률: {fabric.composition}</p>
                )}
                {fabric.weight && (
                  <p className="text-zinc-400 text-xs">중량: {fabric.weight} g/m²</p>
                )}
                {fabric.finish && (
                  <p className="text-zinc-400 text-xs">가공: {fabric.finish}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
