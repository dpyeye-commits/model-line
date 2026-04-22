"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

interface Props {
  error?: string;
  brandId: string;
  backHref: string;
  createFabric: (brandId: string, backHref: string, formData: FormData) => Promise<void>;
}

export function FabricNewForm({ error, brandId, backHref, createFabric }: Props) {
  const [plan, setPlan] = useState<"plan_a" | "plan_b">("plan_a");

  const action = createFabric.bind(null, brandId, backHref);

  return (
    <form action={action} className="space-y-8">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm">{error}</div>
      )}

      {/* 컨텐츠 플랜 */}
      <div className="space-y-3">
        <Label className="text-zinc-300 text-sm font-semibold">컨텐츠 제공 방안 *</Label>
        <input type="hidden" name="content_plan" value={plan} />
        <div className="grid grid-cols-2 gap-3">
          {[
            { key: "plan_a", title: "1안", items: ["원단 모델링 5종", "디지털 라이브러리 5종", "홍보영상 1종"] },
            { key: "plan_b", title: "2안", items: ["원단 모델링 10종", "디지털 라이브러리 10종", "의상 모델링 1종", "홍보영상 1종"] },
          ].map(({ key, title, items }) => (
            <button
              key={key}
              type="button"
              onClick={() => setPlan(key as "plan_a" | "plan_b")}
              className={`p-4 rounded-xl border text-left transition-all ${
                plan === key ? "border-white bg-white/5 text-white" : "border-zinc-700 text-zinc-400 hover:border-zinc-500"
              }`}
            >
              <div className="font-semibold text-sm mb-1">{title}</div>
              <div className="text-xs space-y-0.5 opacity-80">
                {items.map(i => <div key={i}>{i}</div>)}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 기본 정보 */}
      <div className="space-y-4">
        <h3 className="text-white font-semibold text-sm border-b border-zinc-800 pb-2">기본 소재 정보</h3>
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
              {["일반","발수 가공","방염 가공","항균 가공","스트레치","워싱"].map(v => <option key={v}>{v}</option>)}
            </select>
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-zinc-300">특이사항 / 메모</Label>
          <Textarea name="notes" placeholder="세탁 방법, 보관 주의사항, 특수 기능 등" className="bg-zinc-900 border-zinc-700 text-white min-h-20 resize-none" />
        </div>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
        <p className="text-zinc-400 text-xs leading-relaxed">
          <span className="text-zinc-200 font-medium">📌 이미지 업로드</span> — 저장 후 상세 페이지에서 실물 스와치·색상맵·노말맵·반사맵·투명맵·드레이핑·가상맵핑을 업로드합니다.
        </p>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" className="bg-white text-zinc-950 hover:bg-zinc-100 flex-1">소재 저장</Button>
        <Link href={backHref}>
          <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:text-white">취소</Button>
        </Link>
      </div>
    </form>
  );
}
