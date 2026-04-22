"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Layers, Upload } from "lucide-react";
import Link from "next/link";
import { SectionTitle } from "@/components/section-header";

interface Props {
  error?: string;
  backHref: string;
  action: (formData: FormData) => Promise<void>;
}

const PLAN_OPTIONS = [
  {
    key: "plan_a",
    title: "1안",
    desc: "기본 디지털화",
    items: ["원단 모델링 5종", "디지털 라이브러리 5종", "홍보영상 1종"],
    color: "cyan",
    active: "border-cyan-500 bg-cyan-500/10",
    text: "text-cyan-400",
    dot: "bg-cyan-400",
  },
  {
    key: "plan_b",
    title: "2안",
    desc: "풀 패키지",
    items: ["원단 모델링 10종", "디지털 라이브러리 10종", "의상 모델링 1종", "홍보영상 1종"],
    color: "violet",
    active: "border-violet-500 bg-violet-500/10",
    text: "text-violet-400",
    dot: "bg-violet-400",
  },
];

const FINISH_OPTIONS = ["일반", "발수 가공", "방염 가공", "항균 가공", "스트레치", "워싱"];

export function FabricNewForm({ error, backHref, action }: Props) {
  const [plan, setPlan] = useState<"plan_a" | "plan_b">("plan_a");

  return (
    <form action={action} className="space-y-5">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* 컨텐츠 방안 선택 */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-4">
        <SectionTitle title="컨텐츠 제공 방안" icon={CheckCircle2} color="emerald" />
        <input type="hidden" name="content_plan" value={plan} />
        <div className="grid grid-cols-2 gap-3">
          {PLAN_OPTIONS.map(({ key, title, desc, items, active, text, dot }) => (
            <button
              key={key}
              type="button"
              onClick={() => setPlan(key as "plan_a" | "plan_b")}
              className={`relative p-4 rounded-xl border text-left transition-all duration-150 ${
                plan === key
                  ? `${active} shadow-lg`
                  : "border-zinc-700 hover:border-zinc-500 bg-zinc-800/40"
              }`}
            >
              {plan === key && (
                <div className={`absolute top-3 right-3 w-2 h-2 rounded-full ${dot}`} />
              )}
              <div className={`font-bold text-base mb-0.5 ${plan === key ? text : "text-zinc-300"}`}>
                {title}
              </div>
              <div className="text-zinc-500 text-[11px] mb-2">{desc}</div>
              <div className="space-y-1">
                {items.map(i => (
                  <div key={i} className="flex items-center gap-1.5">
                    <div className={`w-1 h-1 rounded-full shrink-0 ${plan === key ? dot : "bg-zinc-600"}`} />
                    <span className={`text-xs ${plan === key ? "text-zinc-300" : "text-zinc-500"}`}>{i}</span>
                  </div>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 기본 소재 정보 */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-4">
        <SectionTitle title="기본 소재 정보" icon={Layers} color="cyan" />

        <div className="space-y-2">
          <Label className="text-zinc-300">소재명 *</Label>
          <Input
            name="name"
            placeholder="예: 면 혼방 트윌"
            required
            className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-600 focus:border-cyan-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-zinc-300">혼방률</Label>
            <Input
              name="composition"
              placeholder="면 80%, 폴리 20%"
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-600"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-zinc-300">중량 (g/m²)</Label>
            <Input
              name="weight"
              placeholder="180"
              type="number"
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-600"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-zinc-300">폭 (cm)</Label>
            <Input
              name="width"
              placeholder="150"
              type="number"
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-600"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-zinc-300">가공 방식</Label>
            <select
              name="finish"
              className="w-full rounded-lg bg-zinc-800 border border-zinc-700 text-white px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500"
            >
              <option value="">선택</option>
              {FINISH_OPTIONS.map(v => <option key={v}>{v}</option>)}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-zinc-300">특이사항 / 메모</Label>
          <Textarea
            name="notes"
            placeholder="세탁 방법, 보관 주의사항, 특수 기능 등"
            className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-600 min-h-20 resize-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* 이미지 업로드 안내 */}
      <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-4">
        <div className="flex items-start gap-2.5">
          <Upload className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
          <p className="text-zinc-400 text-xs leading-relaxed">
            <span className="text-cyan-300 font-medium">저장 후 상세 페이지</span>에서 실물 스와치·색상맵·노말맵·반사맵·투명맵·드레이핑·가상맵핑 이미지를 업로드합니다.
          </p>
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex gap-3 pt-1">
        <Button
          type="submit"
          className="bg-cyan-600 text-white hover:bg-cyan-500 flex-1 h-11 font-semibold"
        >
          소재 저장
        </Button>
        <Link href={backHref}>
          <Button
            variant="outline"
            className="border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 h-11"
          >
            취소
          </Button>
        </Link>
      </div>
    </form>
  );
}
