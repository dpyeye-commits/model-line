import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Upload } from "lucide-react";

export default function NewFabricPage() {
  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/dashboard/fabrics">
          <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">소재 추가</h1>
          <p className="text-zinc-400 text-sm mt-0.5">원단·소재 정보를 등록하세요</p>
        </div>
      </div>

      <form className="space-y-6">
        {/* 스와치 이미지 */}
        <div className="space-y-2">
          <Label className="text-zinc-300">스와치 이미지</Label>
          <div className="grid grid-cols-2 gap-4">
            <div className="border-2 border-dashed border-zinc-700 rounded-xl p-6 text-center cursor-pointer hover:border-zinc-500 transition-colors">
              <Upload className="w-6 h-6 text-zinc-500 mx-auto mb-2" />
              <p className="text-zinc-400 text-xs">실물 스와치 사진</p>
              <p className="text-zinc-600 text-xs mt-1">JPG, PNG (최대 10MB)</p>
            </div>
            <div className="border-2 border-dashed border-zinc-700 rounded-xl p-6 text-center cursor-pointer hover:border-zinc-500 transition-colors">
              <Upload className="w-6 h-6 text-zinc-500 mx-auto mb-2" />
              <p className="text-zinc-400 text-xs">디지털 맵 파일</p>
              <p className="text-zinc-600 text-xs mt-1">PNG, PSD, TIF</p>
            </div>
          </div>
        </div>

        {/* 소재명 */}
        <div className="space-y-2">
          <Label className="text-zinc-300">소재명 *</Label>
          <Input
            placeholder="예: 면 혼방 트윌"
            className="bg-zinc-900 border-zinc-700 text-white"
          />
        </div>

        {/* 혼방률 + 중량 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-zinc-300">혼방률</Label>
            <Input
              placeholder="면 80%, 폴리 20%"
              className="bg-zinc-900 border-zinc-700 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-zinc-300">중량 (g/m²)</Label>
            <Input
              placeholder="180"
              type="number"
              className="bg-zinc-900 border-zinc-700 text-white"
            />
          </div>
        </div>

        {/* 폭 + 가공 방식 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-zinc-300">폭 (cm)</Label>
            <Input
              placeholder="150"
              type="number"
              className="bg-zinc-900 border-zinc-700 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-zinc-300">가공 방식</Label>
            <select className="w-full rounded-md bg-zinc-900 border border-zinc-700 text-white px-3 py-2 text-sm">
              <option value="">선택</option>
              <option>일반</option>
              <option>발수 가공</option>
              <option>방염 가공</option>
              <option>항균 가공</option>
              <option>스트레치</option>
              <option>워싱</option>
            </select>
          </div>
        </div>

        {/* 특이사항 */}
        <div className="space-y-2">
          <Label className="text-zinc-300">특이사항 / 메모</Label>
          <Textarea
            placeholder="세탁 방법, 보관 주의사항, 특수 기능 등"
            className="bg-zinc-900 border-zinc-700 text-white min-h-24 resize-none"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button className="bg-white text-zinc-950 hover:bg-zinc-100 flex-1">
            소재 저장
          </Button>
          <Link href="/dashboard/fabrics">
            <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:text-white">
              취소
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
