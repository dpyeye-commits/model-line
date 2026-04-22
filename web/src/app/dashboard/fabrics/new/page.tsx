import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shirt } from "lucide-react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { FabricNewForm } from "./form";
import { createFabricForBrand } from "./actions";
import { SectionHeader } from "@/components/section-header";

export default async function NewFabricPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; brandId?: string }>;
}) {
  const { error, brandId } = await searchParams;
  const supabase = await createClient();

  let brand = null;
  if (brandId) {
    const { data } = await supabase.from("brands").select("id, name").eq("id", brandId).single();
    brand = data;
  } else {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase.from("brands").select("id, name").eq("user_id", user.id).limit(1).single();
      brand = data;
    }
  }

  if (!brand) redirect("/dashboard");

  const backHref = brandId ? `/dashboard/company/${brandId}` : "/dashboard/fabrics";
  const action = createFabricForBrand.bind(null, brand.id, backHref);

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center gap-3 mb-8">
        <Link href={backHref}>
          <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white shrink-0">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <SectionHeader title="소재 추가" subtitle={brand.name} icon={Shirt} color="cyan" />
      </div>
      <FabricNewForm error={error} backHref={backHref} action={action} />
    </div>
  );
}
