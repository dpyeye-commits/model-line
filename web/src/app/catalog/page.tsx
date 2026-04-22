import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Package } from "lucide-react";
import { Input } from "@/components/ui/input";

const categories = ["전체", "상의", "하의", "아우터", "원단/소재", "액세서리"];
const seasons = ["전체 시즌", "2026 S/S", "2026 F/W", "2025 F/W"];

export default function CatalogPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* 헤더 */}
      <nav className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">Model Line</Link>
        <div className="flex gap-3">
          <Link href="/auth/login">
            <Button variant="ghost" className="text-zinc-300 hover:text-white">로그인</Button>
          </Link>
          <Link href="/auth/signup">
            <Button className="bg-white text-zinc-950 hover:bg-zinc-100">시작하기</Button>
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* 타이틀 */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">브랜드 카탈로그</h1>
          <p className="text-zinc-400">등록된 브랜드의 제품 라인을 둘러보세요</p>
        </div>

        {/* 검색 + 필터 */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <Input
              placeholder="브랜드명, 제품 라인 검색..."
              className="bg-zinc-900 border-zinc-700 text-white pl-9"
            />
          </div>
          <div className="flex gap-2">
            <select className="rounded-md bg-zinc-900 border border-zinc-700 text-white px-3 py-2 text-sm">
              {seasons.map((s) => <option key={s}>{s}</option>)}
            </select>
            <Button variant="outline" className="border-zinc-700 text-zinc-300 gap-2">
              <Filter className="w-4 h-4" />
              필터
            </Button>
          </div>
        </div>

        {/* 카테고리 탭 */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                i === 0
                  ? "bg-white text-zinc-950"
                  : "bg-zinc-900 border border-zinc-700 text-zinc-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 빈 상태 */}
        <div className="border border-dashed border-zinc-700 rounded-xl p-24 text-center">
          <Package className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-white font-medium mb-2">아직 공개된 제품 라인이 없습니다</h3>
          <p className="text-zinc-400 text-sm mb-6">브랜드 가입 후 제품 라인을 등록해보세요</p>
          <Link href="/auth/signup">
            <Button className="bg-white text-zinc-950 hover:bg-zinc-100">
              브랜드 등록하기
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
