import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";

const categories = ["상의", "하의", "아우터", "원단/소재", "액세서리"];
const seasons = ["2026 S/S", "2026 F/W", "2025 F/W", "2025 S/S"];
const statuses = [
  { value: "draft", label: "초안" },
  { value: "active", label: "활성" },
  { value: "archived", label: "보관" },
];

export default function NewProductLinePage() {
  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/dashboard/products">
          <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">새 제품 라인</h1>
          <p className="text-zinc-400 text-sm mt-0.5">시즌 컬렉션을 등록하세요</p>
        </div>
      </div>

      <form className="space-y-6">
        {/* 라인명 */}
        <div className="space-y-2">
          <Label className="text-zinc-300">라인명 *</Label>
          <Input
            placeholder="예: 2026 S/S Core Collection"
            className="bg-zinc-900 border-zinc-700 text-white"
          />
        </div>

        {/* 시즌 + 카테고리 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-zinc-300">시즌</Label>
            <select className="w-full rounded-md bg-zinc-900 border border-zinc-700 text-white px-3 py-2 text-sm">
              <option value="">시즌 선택</option>
              {seasons.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <Label className="text-zinc-300">카테고리</Label>
            <select className="w-full rounded-md bg-zinc-900 border border-zinc-700 text-white px-3 py-2 text-sm">
              <option value="">카테고리 선택</option>
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* 설명 */}
        <div className="space-y-2">
          <Label className="text-zinc-300">설명</Label>
          <Textarea
            placeholder="라인 컨셉, 주요 소재, 타겟 시장 등을 입력하세요"
            className="bg-zinc-900 border-zinc-700 text-white min-h-28 resize-none"
          />
        </div>

        {/* 상태 + 공개 여부 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-zinc-300">상태</Label>
            <select className="w-full rounded-md bg-zinc-900 border border-zinc-700 text-white px-3 py-2 text-sm">
              {statuses.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label className="text-zinc-300">공개 여부</Label>
            <select className="w-full rounded-md bg-zinc-900 border border-zinc-700 text-white px-3 py-2 text-sm">
              <option value="false">비공개</option>
              <option value="true">공개 (카탈로그 노출)</option>
            </select>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex gap-3 pt-2">
          <Button className="bg-white text-zinc-950 hover:bg-zinc-100 flex-1">
            라인 저장
          </Button>
          <Link href="/dashboard/products">
            <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:text-white">
              취소
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
