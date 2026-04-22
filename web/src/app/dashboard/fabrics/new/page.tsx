import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { createFabric, getMyBrand } from "../../actions";
import { redirect } from "next/navigation";
import { FabricNewForm } from "./form";

export default async function NewFabricPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const brand = await getMyBrand();
  if (!brand) redirect("/dashboard/brand/new");

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/dashboard/fabrics">
          <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">소재 추가</h1>
          <p className="text-zinc-400 text-sm mt-0.5">원단·소재 정보를 등록하세요</p>
        </div>
      </div>
      <FabricNewForm error={error} createFabric={createFabric} />
    </div>
  );
}
