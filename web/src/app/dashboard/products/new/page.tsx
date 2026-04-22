import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Package, Layers, Tag, Eye, FileText } from "lucide-react";
import { createProductLine, getSeasons, getCategories, getMyBrand } from "../../actions";
import { redirect } from "next/navigation";
import { SectionHeader, SectionTitle } from "@/components/section-header";

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
      {/* 헤더 */}
      <div className="flex items-center gap-3 mb-8">
        <Link href="/dashboard/products">
          <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white shrink-0">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <SectionHeader title="새 제품 라인" subtitle="시즌 컬렉션을 등록하세요" icon={Package} color="violet" />
      </div>

      <form action={createProductLine} className="space-y-6">
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* 라인명 */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-4">
          <SectionTitle title="라인 기본 정보" icon={FileText} color="violet" />
          <div className="space-y-2">
            <Label className="text-zinc-300">라인명 *</Label>
            <Input
              name="name"
              placeholder="예: 2026 S/S Core Collection"
              required
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-600 focus:border-violet-500 focus:ring-violet-500/20"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-zinc-300">설명</Label>
            <Textarea
              name="description"
              placeholder="라인 컨셉, 주요 소재, 타겟 시장 등"
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-600 min-h-24 resize-none focus:border-violet-500"
            />
          </div>
        </div>

        {/* 시즌 · 카테고리 */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-4">
          <SectionTitle title="분류" icon={Tag} color="cyan" />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-zinc-300">시즌</Label>
              <select
                name="season_id"
                className="w-full rounded-lg bg-zinc-800 border border-zinc-700 text-white px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500"
              >
                <option value="">시즌 선택</option>
                {seasons.map((s: any) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-300">카테고리</Label>
              <select
                name="category_id"
                className="w-full rounded-lg bg-zinc-800 border border-zinc-700 text-white px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500"
              >
                <option value="">카테고리 선택</option>
                {categories.map((c: any) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 상태 · 공개 여부 */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-4">
          <SectionTitle title="상태 설정" icon={Eye} color="emerald" />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-zinc-300">진행 상태</Label>
              <select
                name="status"
                className="w-full rounded-lg bg-zinc-800 border border-zinc-700 text-white px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
              >
                <option value="draft">🗒 초안</option>
                <option value="active">✅ 활성</option>
                <option value="archived">📦 보관</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-300">공개 여부</Label>
              <select
                name="is_public"
                className="w-full rounded-lg bg-zinc-800 border border-zinc-700 text-white px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
              >
                <option value="false">🔒 비공개</option>
                <option value="true">🌐 공개 (카탈로그 노출)</option>
              </select>
            </div>
          </div>
        </div>

        {/* 안내 박스 */}
        <div className="bg-violet-500/5 border border-violet-500/20 rounded-xl p-4">
          <div className="flex items-start gap-2.5">
            <Layers className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
            <p className="text-zinc-400 text-xs leading-relaxed">
              <span className="text-violet-300 font-medium">라인 저장 후</span> 상세 페이지에서 개별 제품을 추가하고 이미지를 업로드할 수 있습니다.
            </p>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex gap-3 pt-2">
          <Button
            type="submit"
            className="bg-violet-600 text-white hover:bg-violet-500 flex-1 h-11 font-semibold"
          >
            라인 저장
          </Button>
          <Link href="/dashboard/products">
            <Button
              variant="outline"
              className="border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 h-11"
            >
              취소
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
