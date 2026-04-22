import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* 네비게이션 */}
      <nav className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shrink-0">
            <span className="text-zinc-950 font-black text-sm leading-none">경</span>
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-tight">경기섬유산업연합회</p>
            <p className="text-zinc-500 text-xs leading-tight">텍스타일 디지털화 플랫폼</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href="/auth/login">
            <Button variant="ghost" className="text-zinc-300 hover:text-white">로그인</Button>
          </Link>
          <Link href="/auth/signup">
            <Button className="bg-white text-zinc-950 hover:bg-zinc-100">시작하기</Button>
          </Link>
        </div>
      </nav>

      {/* 히어로 */}
      <section className="max-w-4xl mx-auto px-6 py-28 text-center">
        <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-700 rounded-full px-4 py-1.5 mb-8">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          <p className="text-zinc-400 text-sm">경기섬유산업연합회 · 텍스타일 디지털화 사업</p>
        </div>
        <h1 className="text-5xl font-bold leading-tight mb-6">
          <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
            섬유소재를 디지털로,
          </span>
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-lime-400 bg-clip-text text-transparent">
            바이어와 시장을 하나로
          </span>
        </h1>
        <p className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto">
          섬유·패션 기업의 원단 소재를 디지털 컨텐츠로 제작하여
          온·오프라인 바이어 상담 및 마케팅 도구로 활용하세요
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/auth/login">
            <Button size="lg" className="bg-white text-zinc-950 hover:bg-zinc-100 px-8">
              관리자 로그인
            </Button>
          </Link>
          <Link href="/dashboard/catalog">
            <Button size="lg" variant="outline" className="border-zinc-700 text-zinc-300 hover:text-white px-8">
              소재 카탈로그
            </Button>
          </Link>
        </div>
      </section>

      {/* 기능 카드 */}
      <section className="max-w-5xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: "🧵",
            title: "원단 디지털 라이브러리",
            desc: "실물 스와치·색상맵·노말맵·반사맵·투명맵·드레이핑·가상맵핑 일괄 관리",
          },
          {
            icon: "🗂️",
            title: "디지털 컨텐츠 제작",
            desc: "1안(원단 모델링 5종) / 2안(원단 10종 + 의상 모델링) 맞춤 제작 지원",
          },
          {
            icon: "📊",
            title: "업체별 진행 현황",
            desc: "16개 참여 업체의 디지털화 진행률을 실시간으로 한눈에 확인",
          },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="text-3xl mb-4">{icon}</div>
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </section>

      {/* 푸터 */}
      <footer className="border-t border-zinc-800 px-6 py-6 text-center">
        <p className="text-zinc-600 text-sm">© 2026 경기섬유산업연합회 · 텍스타일 디지털화 컨텐츠 제작 사업</p>
      </footer>
    </main>
  );
}
