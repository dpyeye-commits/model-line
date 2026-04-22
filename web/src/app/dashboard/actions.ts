"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

// 현재 사용자의 브랜드 가져오기
export async function getMyBrand() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("brands")
    .select("*")
    .eq("user_id", user.id)
    .single();
  return data;
}

// 브랜드 생성
export async function createBrand(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const name = formData.get("name") as string;
  const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  const description = formData.get("description") as string;
  const website = formData.get("website") as string;

  const { error } = await supabase.from("brands").insert({
    user_id: user.id,
    name,
    slug: `${slug}-${Date.now()}`,
    description: description || null,
    website: website || null,
  });

  if (error) redirect(`/dashboard/brand/new?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/dashboard");
  redirect("/dashboard");
}

// 제품 라인 목록
export async function getProductLines() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from("product_lines")
    .select(`*, seasons(name), categories(name), brands!inner(user_id)`)
    .eq("brands.user_id", user.id)
    .order("created_at", { ascending: false });
  return data ?? [];
}

// 제품 라인 생성
export async function createProductLine(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const brand = await getMyBrand();
  if (!brand) redirect("/dashboard/brand/new");

  const name = formData.get("name") as string;
  const season_id = formData.get("season_id") as string || null;
  const category_id = formData.get("category_id") as string || null;
  const description = formData.get("description") as string || null;
  const status = formData.get("status") as string || "draft";
  const is_public = formData.get("is_public") === "true";

  const { error } = await supabase.from("product_lines").insert({
    brand_id: brand.id,
    name,
    season_id: season_id || null,
    category_id: category_id || null,
    description,
    status,
    is_public,
  });

  if (error) redirect(`/dashboard/products/new?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}

// 제품 라인 삭제
export async function deleteProductLine(id: string) {
  const supabase = await createClient();
  await supabase.from("product_lines").delete().eq("id", id);
  revalidatePath("/dashboard/products");
}

// 소재 목록
export async function getFabrics() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from("fabrics")
    .select(`*, brands!inner(user_id)`)
    .eq("brands.user_id", user.id)
    .order("created_at", { ascending: false });
  return data ?? [];
}

// 소재 생성
export async function createFabric(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const brand = await getMyBrand();
  if (!brand) redirect("/dashboard/brand/new");

  const name = formData.get("name") as string;
  const composition = formData.get("composition") as string || null;
  const weight = formData.get("weight") as string || null;
  const width = formData.get("width") as string || null;
  const finish = formData.get("finish") as string || null;

  const { error } = await supabase.from("fabrics").insert({
    brand_id: brand.id,
    name,
    composition,
    weight,
    width,
    finish: finish || null,
  });

  if (error) redirect(`/dashboard/fabrics/new?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/dashboard/fabrics");
  redirect("/dashboard/fabrics");
}

// 소재 삭제
export async function deleteFabric(id: string) {
  const supabase = await createClient();
  await supabase.from("fabrics").delete().eq("id", id);
  revalidatePath("/dashboard/fabrics");
}

// 시즌 목록
export async function getSeasons() {
  const supabase = await createClient();
  const { data } = await supabase.from("seasons").select("*").order("year", { ascending: false });
  return data ?? [];
}

// 카테고리 목록
export async function getCategories() {
  const supabase = await createClient();
  const { data } = await supabase.from("categories").select("*").order("name");
  return data ?? [];
}
