import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* 네비게이션 */}
      <nav className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <span className="text-xl font-bold tracking-tight">Model Line</span>
        <div className="flex gap-3">
          <Link href="/auth/login">
            <Button variant="ghost" className="text-zinc-300 hover:text-white">
              로그인
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button className="bg-white text-zinc-950 hover:bg-zinc-100">
              시작하기
            </Button>
          </Link>
        </div>
      </nav>

      {/* 히어로 */}
      <section className="max-w-4xl mx-auto px-6 py-28 text-center">
        <p className="text-sm text-zinc-400 mb-4 tracking-widest uppercase">
          Textile · Fashion · Agency
        </p>
        <h1 className="text-5xl font-bold leading-tight mb-6">
          제품 라인을 디지털로,
          <br />
          <span className="text-zinc-400">모델과 브랜드를 하나로</span>
        </h1>
        <p className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto">
          의류·텍스타일 제품 라인을 체계적으로 관리하고,
          모델 에이전시와 직접 연결하는 통합 플랫폼
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/auth/signup">
            <Button
              size="lg"
              className="bg-white text-zinc-950 hover:bg-zinc-100 px-8"
            >
              무료로 시작하기
            </Button>
          </Link>
          <Link href="/catalog">
            <Button
              size="lg"
              variant="outline"
              className="border-zinc-700 text-zinc-300 hover:text-white px-8"
            >
              카탈로그 보기
            </Button>
          </Link>
        </div>
      </section>

      {/* 기능 카드 */}
      <section className="max-w-5xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: "📦",
            title: "제품 라인 관리",
            desc: "시즌별 컬렉션, 소재·컬러·사이즈 정보를 한 곳에서 관리",
          },
          {
            icon: "🗂️",
            title: "디지털 카탈로그",
            desc: "이미지·3D 파일·동영상을 포함한 디지털 카탈로그 자동 생성",
          },
          {
            icon: "🤝",
            title: "모델 에이전시 연결",
            desc: "제품에 맞는 모델을 에이전시와 직접 매칭 (Phase 2)",
          },
        ].map(({ icon, title, desc }) => (
          <div
            key={title}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"
          >
            <div className="text-3xl mb-4">{icon}</div>
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <p className="text-zinc-400 text-sm">{desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
