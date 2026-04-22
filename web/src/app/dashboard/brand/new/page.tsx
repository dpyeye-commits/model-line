import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createBrand } from "../../actions";

export default async function NewBrandPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">브랜드 프로필 설정</h1>
        <p className="text-zinc-400 text-sm mt-1">제품 라인을 등록하기 전에 브랜드 정보를 입력하세요</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm mb-4">
            {error}
          </div>
        )}
        <form action={createBrand} className="space-y-5">
          <div className="space-y-2">
            <Label className="text-zinc-300">브랜드명 *</Label>
            <Input name="name" placeholder="예: (주)아크네 스튜디오" required className="bg-zinc-800 border-zinc-700 text-white" />
          </div>
          <div className="space-y-2">
            <Label className="text-zinc-300">브랜드 소개</Label>
            <Textarea name="description" placeholder="브랜드 컨셉, 타겟, 스타일 등" className="bg-zinc-800 border-zinc-700 text-white min-h-24 resize-none" />
          </div>
          <div className="space-y-2">
            <Label className="text-zinc-300">웹사이트</Label>
            <Input name="website" type="url" placeholder="https://brand.com" className="bg-zinc-800 border-zinc-700 text-white" />
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="submit" className="bg-white text-zinc-950 hover:bg-zinc-100 flex-1">
              브랜드 저장하고 시작하기
            </Button>
            <Link href="/dashboard">
              <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:text-white">취소</Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
