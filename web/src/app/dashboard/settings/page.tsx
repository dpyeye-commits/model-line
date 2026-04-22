import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Building2, Globe, LogOut, Settings } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getMyBrand } from "../actions";
import { updateBrand, signOut } from "./actions";
import { LogoUpload } from "./logo-upload";
import Link from "next/link";
import { SectionHeader, SectionTitle } from "@/components/section-header";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; saved?: string }>;
}) {
  const { error, saved } = await searchParams;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const brand = await getMyBrand();

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <SectionHeader title="설정" subtitle="브랜드 프로필을 관리하세요" icon={Settings} color="amber" />
      </div>

      {saved && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg px-4 py-3 text-green-400 text-sm mb-6">
          저장되었습니다.
        </div>
      )}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm mb-6">
          {error}
        </div>
      )}

      {/* 브랜드 프로필 */}
      <section className="space-y-6">
        <SectionTitle title="브랜드 정보" icon={Building2} color="emerald" />

        {brand ? (
          <form action={updateBrand} className="space-y-5">
            <LogoUpload brandId={brand.id} currentLogoUrl={brand.logo_url} />
            <div className="space-y-2">
              <Label className="text-zinc-300">브랜드명 *</Label>
              <Input name="name" defaultValue={brand.name} required className="bg-zinc-900 border-zinc-700 text-white" />
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-300">브랜드 소개</Label>
              <Textarea name="description" defaultValue={brand.description ?? ""} placeholder="브랜드 스토리, 주요 제품군, 타겟 시장" className="bg-zinc-900 border-zinc-700 text-white min-h-28 resize-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-zinc-300">국가</Label>
                <select name="country" defaultValue={brand.country ?? "KR"} className="w-full rounded-md bg-zinc-900 border border-zinc-700 text-white px-3 py-2 text-sm">
                  <option value="KR">🇰🇷 대한민국</option>
                  <option value="US">🇺🇸 미국</option>
                  <option value="JP">🇯🇵 일본</option>
                  <option value="IT">🇮🇹 이탈리아</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-zinc-300 flex items-center gap-1"><Globe className="w-3 h-3" /> 웹사이트</Label>
                <Input name="website" type="url" defaultValue={brand.website ?? ""} placeholder="https://brand.com" className="bg-zinc-900 border-zinc-700 text-white" />
              </div>
            </div>
            <Button type="submit" className="bg-emerald-600 text-white hover:bg-emerald-500 w-full">프로필 저장</Button>
          </form>
        ) : (
          <div className="text-center py-8">
            <p className="text-zinc-400 text-sm mb-4">브랜드가 아직 설정되지 않았습니다</p>
            <Link href="/dashboard/brand/new">
              <Button className="bg-emerald-600 text-white hover:bg-emerald-500">브랜드 만들기</Button>
            </Link>
          </div>
        )}
      </section>

      <Separator className="my-8 bg-zinc-800" />

      {/* 계정 설정 */}
      <section className="space-y-5">
        <SectionTitle title="계정 설정" icon={LogOut} color="cyan" />
        <div className="space-y-2">
          <Label className="text-zinc-300">이메일</Label>
          <Input type="email" value={user?.email ?? ""} className="bg-zinc-900 border-zinc-700 text-zinc-500" disabled readOnly />
          <p className="text-zinc-500 text-xs">이메일은 변경할 수 없습니다</p>
        </div>
        <form action={signOut}>
          <Button type="submit" variant="outline" className="border-zinc-700 text-zinc-300 hover:text-white gap-2">
            <LogOut className="w-4 h-4" /> 로그아웃
          </Button>
        </form>
      </section>
    </div>
  );
}
