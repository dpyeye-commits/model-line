import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { createFabric, getMyBrand } from "../../actions";
import { redirect } from "next/navigation";

export default async function NewFabricPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const brand = await getMyBrand();
  if (!brand) redirect("/dashboard/brand/new");

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

      <form action={createFabric} className="space-y-6">
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <Label className="text-zinc-300">소재명 *</Label>
          <Input name="name" placeholder="예: 면 혼방 트윌" required className="bg-zinc-900 border-zinc-700 text-white" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-zinc-300">혼방률</Label>
            <Input name="composition" placeholder="면 80%, 폴리 20%" className="bg-zinc-900 border-zinc-700 text-white" />
          </div>
          <div className="space-y-2">
            <Label className="text-zinc-300">중량 (g/m²)</Label>
            <Input name="weight" placeholder="180" type="number" className="bg-zinc-900 border-zinc-700 text-white" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-zinc-300">폭 (cm)</Label>
            <Input name="width" placeholder="150" type="number" className="bg-zinc-900 border-zinc-700 text-white" />
          </div>
          <div className="space-y-2">
            <Label className="text-zinc-300">가공 방식</Label>
            <select name="finish" className="w-full rounded-md bg-zinc-900 border border-zinc-700 text-white px-3 py-2 text-sm">
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

        <div className="flex gap-3 pt-2">
          <Button type="submit" className="bg-white text-zinc-950 hover:bg-zinc-100 flex-1">소재 저장</Button>
          <Link href="/dashboard/fabrics">
            <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:text-white">취소</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
