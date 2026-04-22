import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "../actions";

export default function SignupPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-white">
            Model Line
          </Link>
          <p className="text-zinc-400 mt-2">새 계정을 만드세요</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
          {searchParams.error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm">
              {searchParams.error}
            </div>
          )}
          <form action={signUp} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-zinc-300">브랜드명 / 회사명</Label>
              <Input
                name="full_name"
                placeholder="(주)브랜드명"
                required
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-300">이메일</Label>
              <Input
                name="email"
                type="email"
                placeholder="brand@example.com"
                required
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-300">비밀번호</Label>
              <Input
                name="password"
                type="password"
                placeholder="••••••••"
                minLength={6}
                required
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-300">계정 유형</Label>
              <select
                name="role"
                className="w-full rounded-md bg-zinc-800 border border-zinc-700 text-white px-3 py-2 text-sm"
              >
                <option value="brand_admin">브랜드 / 제조사</option>
                <option value="agency_manager">모델 에이전시</option>
              </select>
            </div>
            <Button type="submit" className="w-full bg-white text-zinc-950 hover:bg-zinc-100">
              가입하기
            </Button>
          </form>
        </div>

        <p className="text-center text-zinc-500 text-sm mt-4">
          이미 계정이 있으신가요?{" "}
          <Link href="/auth/login" className="text-white hover:underline">
            로그인
          </Link>
        </p>
      </div>
    </main>
  );
}
