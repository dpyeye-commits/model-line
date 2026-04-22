import { Card } from "@/components/ui/card";
import { Package, Shirt, Image, TrendingUp } from "lucide-react";

const stats = [
  { label: "제품 라인", value: "0", icon: Package, desc: "등록된 라인" },
  { label: "소재", value: "0", icon: Shirt, desc: "소재 라이브러리" },
  { label: "미디어", value: "0", icon: Image, desc: "업로드된 파일" },
  { label: "조회수", value: "0", icon: TrendingUp, desc: "이번 달" },
];

export default function DashboardPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">대시보드</h1>
        <p className="text-zinc-400 mt-1">브랜드 현황을 한눈에 확인하세요</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, desc }) => (
          <Card
            key={label}
            className="bg-zinc-900 border-zinc-800 p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-zinc-400 text-sm">{label}</span>
              <Icon className="w-4 h-4 text-zinc-500" />
            </div>
            <div className="text-3xl font-bold text-white">{value}</div>
            <div className="text-zinc-500 text-xs mt-1">{desc}</div>
          </Card>
        ))}
      </div>

      {/* 빠른 시작 */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-white font-semibold mb-4">빠른 시작</h2>
        <div className="space-y-3 text-sm text-zinc-400">
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs text-white">1</span>
            <span>브랜드 프로필 완성하기 → <span className="text-white underline cursor-pointer">설정</span></span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs text-white">2</span>
            <span>첫 제품 라인 등록하기 → <span className="text-white underline cursor-pointer">제품 라인</span></span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs text-white">3</span>
            <span>소재 라이브러리 구성하기 → <span className="text-white underline cursor-pointer">소재</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
