import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, ExternalLink, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { SocialSidebar } from "@/components/social-sidebar";
import { BottomBanner } from "@/components/bottom-banner";
import { GTIALogoIcon } from "@/components/gtia-logo";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white overflow-hidden">
      {/* 배경 그라디언트 오브 */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-cyan-500/8 rounded-full blur-3xl" />
      </div>

      {/* 네비게이션 */}
      <nav className="relative border-b border-white/5 px-8 py-4 flex items-center justify-between backdrop-blur-sm bg-zinc-950/80 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <GTIALogoIcon size={40} />
          <div>
            <p className="text-white font-bold text-sm leading-tight">경기섬유산업연합회</p>
            <p className="text-zinc-500 text-xs leading-tight">GTIA · 텍스타일 디지털화 플랫폼</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a href="http://www.gtia.or.kr" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 text-zinc-500 hover:text-emerald-400 text-xs transition-colors">
            <ExternalLink className="w-3 h-3" /> 공식 홈페이지
          </a>
          <Link href="/auth/login">
            <Button variant="ghost" className="text-zinc-300 hover:text-white hover:bg-white/5">로그인</Button>
          </Link>
          <Link href="/auth/signup">
            <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:opacity-90 shadow-lg shadow-emerald-500/25 border-0">
              시작하기
            </Button>
          </Link>
        </div>
      </nav>

      {/* 히어로 */}
      <section className="relative max-w-5xl mx-auto px-8 py-28 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-1.5 mb-8">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <p className="text-emerald-300 text-sm">양주·포천·동두천 글로벌 섬유·가죽·패션산업특구</p>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
          <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 bg-clip-text text-transparent">
            경기 섬유소재를 디지털로,
          </span>
          <br />
          <span className="bg-gradient-to-r from-orange-300 via-pink-300 to-violet-300 bg-clip-text text-transparent">
            세계 시장을 하나로
          </span>
        </h1>
        <p className="text-zinc-300 text-lg mb-4 max-w-2xl mx-auto leading-relaxed">
          경기섬유산업연합회가 주관하는{" "}
          <span className="text-emerald-400 font-semibold">텍스타일 디지털 컨텐츠 제작 사업</span>의
          참여 업체 16개사 소재 디지털화 현황을 통합 관리합니다.
        </p>
        <p className="text-zinc-500 text-sm mb-10">
          스와치·컬러맵·3D 모델링으로 제작 → 온·오프라인 바이어 상담 및 글로벌 마케팅 자료로 활용
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/auth/login">
            <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:opacity-90 px-8 shadow-lg shadow-emerald-500/30 border-0 gap-2">
              관리자 로그인 <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/catalog">
            <Button size="lg" variant="outline" className="border-white/10 text-zinc-300 hover:text-white hover:bg-white/5 px-8 backdrop-blur-sm">
              소재 카탈로그 보기
            </Button>
          </Link>
        </div>

        {/* 플로팅 스탯 */}
        <div className="flex justify-center gap-8 mt-16 flex-wrap">
          {[
            { value: "16", label: "참여 업체", color: "text-emerald-400" },
            { value: "7종", label: "디지털 컨텐츠", color: "text-cyan-400" },
            { value: "2안", label: "지원 방안", color: "text-violet-400" },
          ].map(({ value, label, color }) => (
            <div key={label} className="text-center">
              <p className={`text-3xl font-bold ${color}`}>{value}</p>
              <p className="text-zinc-500 text-xs mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 사업 개요 */}
      <section className="max-w-5xl mx-auto px-8 pb-16">
        <div className="relative rounded-2xl overflow-hidden border border-white/10">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-cyan-500/5 to-violet-500/5" />
          <div className="relative p-8">
            <h2 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
              <span className="w-1 h-5 bg-gradient-to-b from-emerald-400 to-cyan-400 rounded-full inline-block" />
              텍스타일 디지털 컨텐츠 제작 사업
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-zinc-300 text-sm leading-relaxed mb-5">
                  경기도 양주·포천·동두천 지역 섬유·패션 기업의 원단 소재를 디지털 컨텐츠로 전환하여
                  글로벌 경쟁력을 강화하는 사업입니다.
                </p>
                <div className="space-y-2.5">
                  {[
                    { text: "참여 업체 16개사 원단 소재 디지털화", color: "text-emerald-400" },
                    { text: "1안: 원단 모델링 5종 (스와치·컬러맵·노말맵·반사맵·투명맵)", color: "text-cyan-400" },
                    { text: "2안: 원단 모델링 10종 + 의상 3D 모델링", color: "text-violet-400" },
                    { text: "디지털 카탈로그·홍보 영상 제작 지원", color: "text-pink-400" },
                  ].map(({ text, color }) => (
                    <div key={text} className="flex items-start gap-2.5">
                      <CheckCircle2 className={`w-4 h-4 ${color} shrink-0 mt-0.5`} />
                      <p className="text-zinc-300 text-sm">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { label: "주관 기관", value: "경기섬유산업연합회 (GTIA)", sub: "2013년 설립 · 경기북부 섬유산업 대표 기관", gradient: "from-emerald-500/20 to-cyan-500/10", border: "border-emerald-500/20" },
                  { label: "대상 지역", value: "경기도 양주시 · 포천시 · 동두천시", sub: "글로벌 섬유·가죽·패션산업특구 (2018년 지정)", gradient: "from-violet-500/20 to-pink-500/10", border: "border-violet-500/20" },
                  { label: "운영 시설", value: "경기섬유종합지원센터 (GTEXTOPIA)", sub: "www.gtextopia.or.kr", gradient: "from-cyan-500/20 to-blue-500/10", border: "border-cyan-500/20" },
                ].map(({ label, value, sub, gradient, border }) => (
                  <div key={label} className={`rounded-xl p-4 bg-gradient-to-r ${gradient} border ${border}`}>
                    <p className="text-zinc-400 text-xs mb-1">{label}</p>
                    <p className="text-white font-semibold text-sm">{value}</p>
                    <p className="text-zinc-500 text-xs mt-0.5">{sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 기능 카드 */}
      <section className="max-w-5xl mx-auto px-8 pb-24 grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          {
            icon: "🧵",
            title: "원단 디지털 라이브러리",
            desc: "스와치·색상맵·노말맵·반사맵·투명맵·드레이핑·가상맵핑 7종 컨텐츠 일괄 관리",
            badge: "16개사",
            href: "/catalog",
            cta: "카탈로그 보기",
            gradient: "from-emerald-500/10 to-cyan-500/5",
            border: "border-emerald-500/20",
            hover: "hover:border-emerald-400/40",
            ctaColor: "text-emerald-400",
          },
          {
            icon: "👗",
            title: "의상 3D 모델링",
            desc: "2안 참여 업체의 의상 3D 모델링 결과물. 글로벌 바이어 상담 자료로 활용",
            badge: "plan_b",
            href: "/garments",
            cta: "갤러리 보기",
            gradient: "from-violet-500/10 to-pink-500/5",
            border: "border-violet-500/20",
            hover: "hover:border-violet-400/40",
            ctaColor: "text-violet-400",
          },
          {
            icon: "📊",
            title: "실시간 진행 현황",
            desc: "16개 참여 업체의 디지털화 진행률을 한눈에 확인. 업체별 완료 현황 공개",
            badge: "실시간",
            href: "/progress",
            cta: "현황 보기",
            gradient: "from-cyan-500/10 to-blue-500/5",
            border: "border-cyan-500/20",
            hover: "hover:border-cyan-400/40",
            ctaColor: "text-cyan-400",
          },
        ].map(({ icon, title, desc, badge, href, cta, gradient, border, hover, ctaColor }) => (
          <Link key={title} href={href}>
            <div className={`relative rounded-xl p-6 bg-gradient-to-br ${gradient} border ${border} ${hover} transition-all cursor-pointer group h-full flex flex-col overflow-hidden`}>
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl">{icon}</span>
                <span className="bg-white/5 text-zinc-400 text-xs px-2 py-0.5 rounded-full border border-white/10">{badge}</span>
              </div>
              <h3 className="font-semibold text-base mb-2 text-white">{title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed flex-1">{desc}</p>
              <div className={`flex items-center gap-1 ${ctaColor} text-xs mt-4 font-medium`}>
                {cta} <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* 푸터 */}
      <footer className="border-t border-white/5 px-8 py-8 bg-zinc-950/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <GTIALogoIcon size={28} />
              <span className="text-white font-bold text-sm">경기섬유산업연합회</span>
              <span className="text-zinc-600 text-xs">GTIA</span>
            </div>
            <p className="text-zinc-500 text-xs leading-relaxed">
              2013년 설립 · 경기도 양주·포천·동두천 섬유산업 지원 기관
            </p>
          </div>
          <div className="space-y-2 text-xs text-zinc-500">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-500/60" />
              <span>경기도 양주시 평화로 1215 경기섬유종합지원센터 202호</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-cyan-500/60" />
              <span>031-850-3651~3657</span>
            </div>
            <a href="http://www.gtia.or.kr" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>www.gtia.or.kr</span>
            </a>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-6 pt-4 border-t border-white/5">
          <p className="text-zinc-700 text-xs">© 2026 경기섬유산업연합회 · 텍스타일 디지털 컨텐츠 제작 사업</p>
        </div>
      </footer>
      <BottomBanner />
      <SocialSidebar />
    </main>
  );
}
