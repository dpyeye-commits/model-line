"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

function getServiceClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

async function uploadFile(bucket: string, path: string, file: File) {
  const service = getServiceClient();
  const buffer = Buffer.from(await file.arrayBuffer());
  const { error } = await service.storage
    .from(bucket)
    .upload(path, buffer, { contentType: file.type, upsert: true });
  if (error) throw new Error(error.message);
  const { data } = service.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

// ── 업체 기본 정보 ────────────────────────────────────────────
export async function updateBrandDescription(brandId: string, description: string) {
  const supabase = await createClient();
  await supabase.from("brands").update({ description }).eq("id", brandId);
  revalidatePath(`/dashboard/company/${brandId}`);
}

// ── 의상 모델링 ──────────────────────────────────────────────
export async function addGarmentModel(brandId: string, formData: FormData) {
  const supabase = await createClient();
  const name = formData.get("name") as string;
  const description = (formData.get("description") as string) || null;

  const { data: inserted } = await supabase
    .from("garment_models")
    .insert({ brand_id: brandId, name, description })
    .select("id")
    .single();
  if (!inserted) return;

  const file = formData.get("image") as File | null;
  if (file && file.size > 0) {
    const ext = file.name.split(".").pop();
    const url = await uploadFile("garment-models", `${brandId}/${inserted.id}.${ext}`, file);
    await supabase.from("garment_models").update({ image_url: url }).eq("id", inserted.id);
  }
  revalidatePath(`/dashboard/company/${brandId}`);
}

export async function deleteGarmentModel(id: string, brandId: string) {
  const supabase = await createClient();
  await supabase.from("garment_models").delete().eq("id", id);
  revalidatePath(`/dashboard/company/${brandId}`);
}

// ── 회사 라이브러리 ───────────────────────────────────────────
export async function uploadCompanyFile(brandId: string, formData: FormData) {
  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) return;

  const name = (formData.get("name") as string) || file.name;
  const file_type = (formData.get("file_type") as string) || "other";
  const ext = file.name.split(".").pop();
  const url = await uploadFile("company-library", `${brandId}/${Date.now()}.${ext}`, file);

  const supabase = await createClient();
  await supabase.from("company_files").insert({ brand_id: brandId, name, file_url: url, file_type });
  revalidatePath(`/dashboard/company/${brandId}`);
}

export async function deleteCompanyFile(id: string, brandId: string) {
  const supabase = await createClient();
  await supabase.from("company_files").delete().eq("id", id);
  revalidatePath(`/dashboard/company/${brandId}`);
}

// ── 홍보영상 ─────────────────────────────────────────────────
export async function addPromoVideo(brandId: string, formData: FormData) {
  const supabase = await createClient();
  const title = formData.get("title") as string;
  const video_url = formData.get("video_url") as string;
  const description = (formData.get("description") as string) || null;
  await supabase.from("promo_videos").insert({ brand_id: brandId, title, video_url, description });
  revalidatePath(`/dashboard/company/${brandId}`);
}

export async function deletePromoVideo(id: string, brandId: string) {
  const supabase = await createClient();
  await supabase.from("promo_videos").delete().eq("id", id);
  revalidatePath(`/dashboard/company/${brandId}`);
}
