import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ExternalLink, Shirt, Layers, Cpu, Sliders, Image, Box, Sparkles } from "lucide-react";
import { SocialSidebar } from "@/components/social-sidebar";
import { BottomBanner } from "@/components/bottom-banner";
import { GTIALogoIcon } from "@/components/gtia-logo";

const TECH_STACK = [
  {
    category: "이미지 생성 (핵심)",
    name: "Stable Diffusion",
    desc: "오픈소스 AI로, 특정 의상을 학습시키거나(LoRA) 레이아웃을 고정(ControlNet)하는 데 필수적입니다.",
    icon: Cpu,
    color: "violet",
    grad: "from-violet-500/15 to-violet-500/5",
    border: "border-violet-500/30",
    badge: "bg-violet-500/20 text-violet-300",
    dot: "bg-violet-400",
    num: "01",
  },
  {
    category: "포즈 및 형태 제어",
    name: "ControlNet",
    desc: "모델의 포즈, 의상의 윤곽선 등을 고정하여 옷이 일그러지지 않게 제어하는 확장 기능입니다.",
    icon: Sliders,
    color: "cyan",
    grad: "from-cyan-500/15 to-cyan-500/5",
    border: "border-cyan-500/30",
    badge: "bg-cyan-500/20 text-cyan-300",
    dot: "bg-cyan-400",
    num: "02",
  },
  {
    category: "의상 고정 기술",
    name: "IP-Adapter / IC-Light",
    desc: "특정 의상 이미지를 참조(Reference)로 사용하여 모델에게 입히는 기술로, 현재 가장 많이 쓰입니다.",
    icon: Image,
    color: "pink",
    grad: "from-pink-500/15 to-pink-500/5",
    border: "border-pink-500/30",
    badge: "bg-pink-500/20 text-pink-300",
    dot: "bg-pink-400",
    num: "03",
  },
  {
    category: "가상 피팅 전용",
    name: "IDM-VTON",
    desc: "최근 가장 주목받는 가상 피팅 모델로, 의상 이미지와 모델 이미지를 합성하여 자연스러운 주름과 텍스처를 구현합니다.",
    icon: Sparkles,
    color: "amber",
    grad: "from-amber-500/15 to-amber-500/5",
    border: "border-amber-500/30",
    badge: "bg-amber-500/20 text-amber-300",
    dot: "bg-amber-400",
    num: "04",
  },
  {
    category: "3D 의상 제작",
    name: "CLO3D / Marvelous Designer",
    desc: "실제 의상 패턴을 바탕으로 3D 의상을 제작합니다. 이를 AI와 결합하면 극강의 사실감을 얻을 수 있습니다.",
    icon: Box,
    color: "emerald",
    grad: "from-emerald-500/15 to-emerald-500/5",
    border: "border-emerald-500/30",
    badge: "bg-emerald-500/20 text-emerald-300",
    dot: "bg-emerald-400",
    num: "05",
  },
];

export default async function GarmentsPage() {
  const supabase = await createClient();

  const { data: models } = await supabase
    .from("garment_models")
    .select("*, brands(id, name, logo_url, content_plan)")
    .order("created_at", { ascending: false });

  const list = models ?? [];

  const byBrand = list.reduce((acc: Record<string, any>, m: any) => {
    const bid = m.brands?.id;
    if (!bid) return acc;
    if (!acc[bid]) acc[bid] = { brand: m.brands, items: [] };
    acc[bid].items.push(m);
    return acc;
  }, {});

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* 헤더 */}
      <nav className="border-b border-zinc-800 px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <GTIALogoIcon size={36} />
          <div>
            <p className="text-white font-bold text-sm leading-tight">경기섬유산업연합회</p>
            <p className="text-zinc-500 text-xs leading-tight">의상 3D 모델링 갤러리</p>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/catalog" className="text-zinc-400 hover:text-white text-sm transition-colors">소재 카탈로그</Link>
          <Link href="/progress" className="text-zinc-400 hover:text-white text-sm transition-colors">진행 현황</Link>
          <Link href="/auth/login" className="text-zinc-400 hover:text-white text-sm transition-colors">관리자 로그인</Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-8 py-12">

        {/* 타이틀 */}
        <div className="mb-12">
          <div className="flex items-start gap-3">
            <div className="w-1 h-10 rounded-full bg-gradient-to-b from-pink-400 to-orange-400 shrink-0" />
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-300 via-orange-300 to-amber-300 bg-clip-text text-transparent">
                의상 3D 모델링 갤러리
              </h1>
              <p className="text-zinc-500 mt-1">2안(plan_b) 참여 업체의 의상 3D 모델링 결과물 · 글로벌 바이어 상담 자료</p>
            </div>
          </div>
        </div>

        {/* ── AI 기술 스택 소개 ── */}
        <div className="mb-14">
          {/* 섹션 제목 */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-6 rounded-full bg-gradient-to-b from-violet-400 to-pink-400 shrink-0" />
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
                <Cpu className="w-3.5 h-3.5 text-violet-400" />
              </div>
              <h2 className="text-white font-bold text-lg bg-gradient-to-r from-violet-300 to-pink-300 bg-clip-text text-transparent">
                의상 모델링 AI 기술 스택
              </h2>
            </div>
          </div>

          {/* 카드 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {TECH_STACK.map(({ category, name, desc, icon: Icon, grad, border, badge, dot, num }) => (
              <div
                key={name}
                className={`relative bg-gradient-to-br ${grad} to-zinc-900 border ${border} rounded-2xl p-5 hover:scale-[1.01] transition-transform duration-150`}
              >
                {/* 번호 */}
                <span className="absolute top-4 right-4 text-zinc-700 font-black text-2xl leading-none select-none">
                  {num}
                </span>

                {/* 아이콘 + 카테고리 */}
                <div className="flex items-center gap-2 mb-3">
                  <Icon className={`w-4 h-4 ${badge.replace("bg-", "text-").replace("/20", "-400")}`} />
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badge}`}>
                    {category}
                  </span>
                </div>

                {/* 기술명 */}
                <h3 className="text-white font-bold text-base mb-2 leading-tight pr-8">
                  {name}
                </h3>

                {/* 구분선 */}
                <div className={`w-8 h-0.5 rounded-full ${dot} mb-3`} />

                {/* 설명 */}
                <p className="text-zinc-400 text-xs leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}

            {/* 파이프라인 흐름 카드 */}
            <div className="bg-gradient-to-br from-zinc-800/60 to-zinc-900 border border-zinc-700/50 rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-0.5 h-4 rounded-full bg-gradient-to-b from-violet-400 to-pink-400" />
                  <span className="text-zinc-300 text-xs font-semibold">제작 파이프라인</span>
                </div>
                <div className="space-y-2">
                  {[
                    { step: "원단 촬영", color: "bg-violet-400" },
                    { step: "AI 모델 생성 (SD)", color: "bg-cyan-400" },
                    { step: "포즈 제어 (ControlNet)", color: "bg-pink-400" },
                    { step: "가상 피팅 (IDM-VTON)", color: "bg-amber-400" },
                    { step: "3D 렌더링 (CLO3D)", color: "bg-emerald-400" },
                  ].map(({ step, color }, i) => (
                    <div key={step} className="flex items-center gap-2.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${color} shrink-0`} />
                      <span className="text-zinc-400 text-xs">{step}</span>
                      {i < 4 && <div className="h-3 w-px bg-zinc-700 ml-0.5" />}
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-zinc-600 text-[10px] mt-4 leading-relaxed">
                최신 AI 기술을 통해 실제 의상의 텍스처·드레이핑·피팅감을 디지털로 완벽 재현합니다.
              </p>
            </div>
          </div>
        </div>

        {/* ── 갤러리 ── */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-6 rounded-full bg-gradient-to-b from-pink-400 to-orange-400 shrink-0" />
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-pink-500/20 border border-pink-500/30 flex items-center justify-center">
                <Shirt className="w-3.5 h-3.5 text-pink-400" />
              </div>
              <h2 className="text-white font-bold text-lg bg-gradient-to-r from-pink-300 to-orange-300 bg-clip-text text-transparent">
                모델링 갤러리
              </h2>
            </div>
          </div>

          {list.length === 0 ? (
            <div className="border border-dashed border-zinc-700 rounded-2xl p-20 text-center">
              <Shirt className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
              <p className="text-white font-medium text-lg mb-2">의상 모델링 준비 중입니다</p>
              <p className="text-zinc-500 text-sm">2안 참여 업체의 의상 3D 모델링 작업이 완료되면 공개됩니다.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {Object.values(byBrand).map(({ brand, items }: any) => (
                <div key={brand.id}>
                  <div className="flex items-center gap-3 mb-5">
                    {brand.logo_url
                      ? <img src={brand.logo_url} alt={brand.name} className="w-8 h-8 rounded-lg object-cover" />
                      : <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center"><Layers className="w-4 h-4 text-zinc-600" /></div>}
                    <div>
                      <h3 className="text-white font-semibold">{brand.name}</h3>
                      <span className="text-zinc-500 text-xs">의상 모델링 {items.length}점</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {items.map((m: any) => (
                      <div key={m.id} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-600 transition-colors">
                        <div className="w-full h-48 bg-zinc-800 flex items-center justify-center">
                          {m.image_url
                            ? <img src={m.image_url} alt={m.name} className="w-full h-full object-cover" />
                            : <Shirt className="w-12 h-12 text-zinc-600" />}
                        </div>
                        <div className="p-3">
                          <p className="text-white text-sm font-medium">{m.name}</p>
                          {m.description && <p className="text-zinc-500 text-xs mt-0.5">{m.description}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <footer className="border-t border-zinc-800 px-8 py-6 mt-16">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <p className="text-zinc-600 text-xs">© 2026 경기섬유산업연합회 · 경기도 양주시 평화로 1215 · 031-850-3651</p>
          <a href="http://www.gtia.or.kr" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 text-zinc-600 hover:text-zinc-400 text-xs transition-colors">
            <ExternalLink className="w-3 h-3" /> www.gtia.or.kr
          </a>
        </div>
      </footer>
      <BottomBanner />
      <SocialSidebar />
    </main>
  );
}
