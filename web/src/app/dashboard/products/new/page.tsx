import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { createProductLine, getSeasons, getCategories, getMyBrand } from "../../actions";
import { redirect } from "next/navigation";

export default async function NewProductLinePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const brand = await getMyBrand();
  if (!brand) redirect("/dashboard/brand/new");

  const [seasons, categories] = await Promise.all([getSeasons(), getCategories()]);

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

      <form action={createProductLine} className="space-y-6">
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <Label className="text-zinc-300">라인명 *</Label>
          <Input name="name" placeholder="예: 2026 S/S Core Collection" required className="bg-zinc-900 border-zinc-700 text-white" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-zinc-300">시즌</Label>
            <select name="season_id" className="w-full rounded-md bg-zinc-900 border border-zinc-700 text-white px-3 py-2 text-sm">
              <option value="">시즌 선택</option>
              {seasons.map((s: any) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label className="text-zinc-300">카테고리</Label>
            <select name="category_id" className="w-full rounded-md bg-zinc-900 border border-zinc-700 text-white px-3 py-2 text-sm">
              <option value="">카테고리 선택</option>
              {categories.map((c: any) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-zinc-300">설명</Label>
          <Textarea name="description" placeholder="라인 컨셉, 주요 소재, 타겟 시장 등" className="bg-zinc-900 border-zinc-700 text-white min-h-28 resize-none" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-zinc-300">상태</Label>
            <select name="status" className="w-full rounded-md bg-zinc-900 border border-zinc-700 text-white px-3 py-2 text-sm">
              <option value="draft">초안</option>
              <option value="active">활성</option>
              <option value="archived">보관</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label className="text-zinc-300">공개 여부</Label>
            <select name="is_public" className="w-full rounded-md bg-zinc-900 border border-zinc-700 text-white px-3 py-2 text-sm">
              <option value="false">비공개</option>
              <option value="true">공개 (카탈로그 노출)</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit" className="bg-white text-zinc-950 hover:bg-zinc-100 flex-1">라인 저장</Button>
          <Link href="/dashboard/products">
            <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:text-white">취소</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
