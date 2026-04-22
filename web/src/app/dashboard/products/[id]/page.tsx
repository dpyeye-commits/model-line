import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Upload, Edit, Trash2 } from "lucide-react";

export default function ProductLineDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/dashboard/products">
          <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white">제품 라인 상세</h1>
            <Badge className="bg-zinc-800 text-zinc-300 border-zinc-700">초안</Badge>
          </div>
          <p className="text-zinc-400 text-sm mt-0.5">2026 S/S · 상의</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-zinc-700 text-zinc-300 gap-2">
            <Edit className="w-4 h-4" /> 편집
          </Button>
          <Button className="bg-white text-zinc-950 hover:bg-zinc-100 gap-2">
            <Plus className="w-4 h-4" /> 제품 추가
          </Button>
        </div>
      </div>

      {/* 제품 추가 영역 */}
      <div className="border border-dashed border-zinc-700 rounded-xl p-12 text-center mb-6">
        <Upload className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
        <h3 className="text-white font-medium mb-1">제품을 추가하세요</h3>
        <p className="text-zinc-400 text-sm mb-4">
          이미지, 소재 정보, 컬러·사이즈 옵션을 등록하세요
        </p>
        <Button className="bg-white text-zinc-950 hover:bg-zinc-100 gap-2">
          <Plus className="w-4 h-4" /> 제품 추가
        </Button>
      </div>

      {/* 라인 정보 */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-white font-semibold mb-4">라인 정보</h2>
        <div className="grid grid-cols-2 gap-y-3 text-sm">
          {[
            ["라인명", "—"],
            ["시즌", "—"],
            ["카테고리", "—"],
            ["상태", "초안"],
            ["공개 여부", "비공개"],
            ["등록일", "—"],
          ].map(([k, v]) => (
            <div key={k} className="flex gap-2">
              <span className="text-zinc-500 w-24">{k}</span>
              <span className="text-zinc-200">{v}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-6">
          <Button variant="outline" className="border-zinc-700 text-zinc-300 gap-2 text-sm">
            <Edit className="w-3 h-3" /> 라인 편집
          </Button>
          <Button variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/10 gap-2 text-sm">
            <Trash2 className="w-3 h-3" /> 삭제
          </Button>
        </div>
      </div>
    </div>
  );
}
