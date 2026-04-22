"use client";

import { useState } from "react";
import Link from "next/link";
import { X, Shirt, Package, Upload, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

const STEPS = [
  {
    icon: CheckCircle2,
    label: "브랜드 프로필 생성",
    desc: "완료됐습니다!",
    done: true,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    icon: Shirt,
    label: "소재 추가",
    desc: "원단 정보를 등록하세요",
    done: false,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/20",
    href: "fabrics",
  },
  {
    icon: Upload,
    label: "디지털 컨텐츠 업로드",
    desc: "스와치·맵핑 이미지를 업로드하세요",
    done: false,
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
    href: "fabrics",
  },
  {
    icon: Package,
    label: "제품 라인 등록",
    desc: "시즌 컬렉션을 구성하세요",
    done: false,
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
    href: "products",
  },
];

export function WelcomeBanner({ brandId, brandName }: { brandId: string; brandName: string }) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="mb-6 relative">
      {/* 배경 글로우 */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-cyan-500/5 to-violet-500/5 rounded-2xl blur-xl" />

      <div className="relative bg-zinc-900/80 border border-emerald-500/20 rounded-2xl overflow-hidden">
        {/* 상단 컬러 바 */}
        <div className="h-1 w-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400" />

        <div className="p-6">
          {/* 닫기 버튼 */}
          <button
            onClick={() => setVisible(false)}
            className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* 타이틀 */}
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-base leading-tight">
                {brandName} 시작을 환영합니다! 🎉
              </h2>
              <p className="text-zinc-500 text-xs mt-0.5">
                아래 단계를 따라 디지털 컨텐츠 제작을 시작하세요
              </p>
            </div>
          </div>

          {/* 스텝 카드 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
            {STEPS.map(({ icon: Icon, label, desc, done, color, bg, href }, i) => (
              <div
                key={label}
                className={`relative rounded-xl border p-3.5 ${bg} ${done ? "opacity-70" : ""}`}
              >
                {/* 스텝 번호 */}
                <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center">
                  {done
                    ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    : <span className="text-zinc-500 text-[10px] font-bold">{i + 1}</span>
                  }
                </div>
                <Icon className={`w-5 h-5 ${color} mb-2`} />
                <p className={`text-xs font-semibold ${done ? "text-zinc-400 line-through" : "text-white"} leading-tight mb-0.5`}>
                  {label}
                </p>
                <p className="text-zinc-500 text-[11px] leading-tight">{desc}</p>
              </div>
            ))}
          </div>

          {/* CTA 버튼 */}
          <div className="flex items-center gap-3">
            <Link href={`/dashboard/fabrics/new?brandId=${brandId}`}>
              <button className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all shadow-lg shadow-emerald-500/20">
                <Shirt className="w-4 h-4" /> 첫 소재 추가하기
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
            <Link href={`/dashboard/settings`}>
              <button className="text-zinc-400 hover:text-zinc-200 text-sm transition-colors px-3 py-2">
                로고 업로드
              </button>
            </Link>
            <button
              onClick={() => setVisible(false)}
              className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors ml-auto"
            >
              나중에 하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
