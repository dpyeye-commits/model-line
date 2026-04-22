import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "../actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-white">
            Model Line
          </Link>
          <p className="text-zinc-400 mt-2">계정에 로그인하세요</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm">
              {error}
            </div>
          )}
          <form action={signIn} className="space-y-4">
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
                required
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
            <Button type="submit" className="w-full bg-white text-zinc-950 hover:bg-zinc-100">
              로그인
            </Button>
          </form>
        </div>

        <p className="text-center text-zinc-500 text-sm mt-4">
          계정이 없으신가요?{" "}
          <Link href="/auth/signup" className="text-white hover:underline">
            회원가입
          </Link>
        </p>
      </div>
    </main>
  );
}
