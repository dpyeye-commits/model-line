"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createFabricForBrand(brandId: string, backHref: string, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const name = formData.get("name") as string;
  const composition = formData.get("composition") as string || null;
  const weight = formData.get("weight") as string || null;
  const width = formData.get("width") as string || null;
  const finish = formData.get("finish") as string || null;
  const notes = formData.get("notes") as string || null;
  const content_plan = formData.get("content_plan") as string || "plan_a";

  const { data: created, error } = await supabase.from("fabrics").insert({
    brand_id: brandId,
    name, composition, weight, width,
    finish: finish || null,
    notes, content_plan,
  }).select("id").single();

  if (error) redirect(`/dashboard/fabrics/new?brandId=${brandId}&error=${encodeURIComponent(error.message)}`);

  revalidatePath("/dashboard/fabrics");
  revalidatePath(`/dashboard/company/${brandId}`);
  redirect(created ? `/dashboard/fabrics/${created.id}` : backHref);
}
