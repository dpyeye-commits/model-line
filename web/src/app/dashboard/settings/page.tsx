import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Building2, Globe, Upload } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">설정</h1>
        <p className="text-zinc-400 mt-1">브랜드 프로필을 완성하세요</p>
      </div>

      {/* 브랜드 프로필 */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="w-4 h-4 text-zinc-400" />
          <h2 className="text-white font-semibold">브랜드 정보</h2>
        </div>

        {/* 로고 업로드 */}
        <div className="space-y-2">
          <Label className="text-zinc-300">브랜드 로고</Label>
          <div className="border-2 border-dashed border-zinc-700 rounded-xl p-8 text-center cursor-pointer hover:border-zinc-500 transition-colors">
            <Upload className="w-8 h-8 text-zinc-500 mx-auto mb-2" />
            <p className="text-zinc-400 text-sm">클릭하여 로고 업로드</p>
            <p className="text-zinc-600 text-xs mt-1">PNG, JPG, SVG (최대 2MB)</p>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-zinc-300">브랜드명 *</Label>
          <Input
            placeholder="(주)브랜드명"
            className="bg-zinc-900 border-zinc-700 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-zinc-300">슬러그 (URL 주소)</Label>
          <div className="flex items-center gap-2">
            <span className="text-zinc-500 text-sm">modelline.io/</span>
            <Input
              placeholder="brand-name"
              className="bg-zinc-900 border-zinc-700 text-white flex-1"
            />
          </div>
          <p className="text-zinc-500 text-xs">영문 소문자, 숫자, 하이픈만 사용 가능</p>
        </div>

        <div className="space-y-2">
          <Label className="text-zinc-300">브랜드 소개</Label>
          <Textarea
            placeholder="브랜드 스토리, 주요 제품군, 타겟 시장을 소개해주세요"
            className="bg-zinc-900 border-zinc-700 text-white min-h-28 resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-zinc-300">국가</Label>
            <select className="w-full rounded-md bg-zinc-900 border border-zinc-700 text-white px-3 py-2 text-sm">
              <option value="KR">🇰🇷 대한민국</option>
              <option value="US">🇺🇸 미국</option>
              <option value="JP">🇯🇵 일본</option>
              <option value="CN">🇨🇳 중국</option>
              <option value="IT">🇮🇹 이탈리아</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label className="text-zinc-300 flex items-center gap-1">
              <Globe className="w-3 h-3" /> 웹사이트
            </Label>
            <Input
              placeholder="https://brand.com"
              className="bg-zinc-900 border-zinc-700 text-white"
            />
          </div>
        </div>

        <Button className="bg-white text-zinc-950 hover:bg-zinc-100 w-full">
          프로필 저장
        </Button>
      </section>

      <Separator className="my-8 bg-zinc-800" />

      {/* 계정 설정 */}
      <section className="space-y-6">
        <h2 className="text-white font-semibold">계정 설정</h2>

        <div className="space-y-2">
          <Label className="text-zinc-300">이메일</Label>
          <Input
            type="email"
            placeholder="brand@example.com"
            className="bg-zinc-900 border-zinc-700 text-white"
            disabled
          />
          <p className="text-zinc-500 text-xs">이메일은 변경할 수 없습니다</p>
        </div>

        <div className="space-y-2">
          <Label className="text-zinc-300">새 비밀번호</Label>
          <Input
            type="password"
            placeholder="••••••••"
            className="bg-zinc-900 border-zinc-700 text-white"
          />
        </div>

        <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:text-white">
          비밀번호 변경
        </Button>
      </section>

      <Separator className="my-8 bg-zinc-800" />

      {/* 위험 영역 */}
      <section className="space-y-4">
        <h2 className="text-red-400 font-semibold">위험 영역</h2>
        <div className="border border-red-500/30 rounded-xl p-4">
          <p className="text-white text-sm font-medium mb-1">계정 삭제</p>
          <p className="text-zinc-400 text-xs mb-3">계정과 모든 데이터가 영구 삭제됩니다.</p>
          <Button variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10 text-sm">
            계정 삭제
          </Button>
        </div>
      </section>
    </div>
  );
}
