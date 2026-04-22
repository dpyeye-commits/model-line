"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createProduct(lineId: string, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const name = formData.get("name") as string;
  const sku = formData.get("sku") as string || null;
  const description = formData.get("description") as string || null;
  const fabric_info = formData.get("fabric_info") as string || null;
  const price = formData.get("price") ? Number(formData.get("price")) : null;
  const sizesRaw = formData.get("sizes") as string;
  const sizes = sizesRaw ? sizesRaw.split(",").map(s => s.trim()).filter(Boolean) : null;

  const { error } = await supabase.from("products").insert({
    line_id: lineId,
    name,
    sku,
    description,
    fabric_info,
    price,
    sizes: sizes ? sizes : null,
  });

  if (error) redirect(`/dashboard/products/${lineId}?error=${encodeURIComponent(error.message)}`);
  revalidatePath(`/dashboard/products/${lineId}`);
  redirect(`/dashboard/products/${lineId}`);
}

export async function deleteProduct(productId: string, lineId: string) {
  const supabase = await createClient();
  await supabase.from("products").delete().eq("id", productId);
  revalidatePath(`/dashboard/products/${lineId}`);
}

export async function deleteProductLine(lineId: string) {
  const supabase = await createClient();
  await supabase.from("product_lines").delete().eq("id", lineId);
  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}
