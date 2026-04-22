import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Globe, Sparkles, ArrowRight, CheckCircle2, Shirt, Upload, Package } from "lucide-react";
import { createBrand } from "../../actions";
import { SectionHeader } from "@/components/section-header";

const STEPS = [
  { icon: CheckCircle2, label: "브랜드 프로필", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/25" },
  { icon: Shirt,        label: "소재 추가",     color: "text-cyan-400",    bg: "bg-cyan-500/10 border-cyan-500/25" },
  { icon: Upload,       label: "컨텐츠 업로드", color: "text-violet-400",  bg: "bg-violet-500/10 border-violet-500/25" },
  { icon: Package,      label: "제품 라인",     color: "text-amber-400",   bg: "bg-amber-500/10 border-amber-500/25" },
];

export default async function NewBrandPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="min-h-full flex items-start justify-center p-8">
      <div className="w-full max-w-xl">

        {/* 타이틀 */}
        <div className="mb-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-emerald-500/20">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <SectionHeader
            title="브랜드 프로필 설정"
            subtitle="제품 라인을 등록하기 전에 브랜드 정보를 입력하세요"
            icon={Building2}
            color="emerald"
          />
        </div>

        {/* 진행 단계 표시 */}
        <div className="flex items-center gap-2 mb-8">
          {STEPS.map(({ icon: Icon, label, color, bg }, i) => (
            <div key={label} className="flex items-center gap-2 flex-1">
              <div className={`flex-1 flex flex-col items-center gap-1.5 rounded-xl border p-2.5 ${i === 0 ? bg : "bg-zinc-900/40 border-zinc-800"}`}>
                <Icon className={`w-4 h-4 ${i === 0 ? color : "text-zinc-600"}`} />
                <span className={`text-[10px] font-medium text-center leading-tight ${i === 0 ? "text-zinc-300" : "text-zinc-600"}`}>
                  {label}
                </span>
                {i === 0 && (
                  <div className="w-4 h-0.5 rounded-full bg-emerald-400" />
                )}
              </div>
              {i < STEPS.length - 1 && (
                <ArrowRight className="w-3 h-3 text-zinc-700 shrink-0" />
              )}
            </div>
          ))}
        </div>

        {/* 폼 카드 */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 shadow-xl">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm mb-5">
              {error}
            </div>
          )}

          <form action={createBrand} className="space-y-5">
            <div className="space-y-2">
              <Label className="text-zinc-300 font-medium">브랜드명 *</Label>
              <Input
                name="name"
                placeholder="예: (주)아크네 스튜디오"
                required
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-600 focus:border-emerald-500 h-11"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-zinc-300 font-medium">브랜드 소개</Label>
              <Textarea
                name="description"
                placeholder="브랜드 컨셉, 타겟 시장, 주요 제품군 등"
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-600 min-h-24 resize-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-zinc-300 font-medium flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-zinc-400" /> 웹사이트
              </Label>
              <Input
                name="website"
                type="url"
                placeholder="https://brand.com"
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-600 focus:border-emerald-500 h-11"
              />
            </div>

            <div className="pt-2 space-y-3">
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-semibold text-base shadow-lg shadow-emerald-500/20 gap-2"
              >
                <Sparkles className="w-4 h-4" />
                브랜드 저장하고 시작하기
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  className="w-full text-zinc-500 hover:text-zinc-300"
                >
                  취소
                </Button>
              </Link>
            </div>
          </form>
        </div>

        <p className="text-center text-zinc-600 text-xs mt-4">
          로고 이미지는 저장 후 설정 페이지에서 업로드할 수 있습니다
        </p>
      </div>
    </div>
  );
}
