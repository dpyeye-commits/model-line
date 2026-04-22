"use server";

import { createClient } from "@/lib/supabase/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

function getServiceClient() {
  return createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

async function uploadToStorage(bucket: string, path: string, file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const service = getServiceClient();
  const { error } = await service.storage
    .from(bucket)
    .upload(path, buffer, { contentType: file.type, upsert: true });
  if (error) throw new Error(error.message);
  const { data: { publicUrl } } = service.storage.from(bucket).getPublicUrl(path);
  return publicUrl;
}

// 소재 이미지 (field: swatch_url | color_map_url | normal_map_url | reflection_map_url | transparency_map_url | draping_url | virtual_mapping_url)
export async function uploadFabricImage(fabricId: string, field: string, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const file = formData.get("file") as File;
  if (!file || file.size === 0) throw new Error("파일이 없습니다");

  const bucket = field === "swatch_url" ? "fabric-swatches" : "texture-maps";
  const ext = file.name.split(".").pop();
  const path = `${user.id}/${fabricId}-${field}.${ext}`;
  const url = await uploadToStorage(bucket, path, file);

  await supabase.from("fabrics").update({ [field]: url }).eq("id", fabricId);
  revalidatePath(`/dashboard/fabrics/${fabricId}`);
  revalidatePath("/dashboard/fabrics");
  return url;
}

// 제품 이미지
export async function uploadProductImage(productId: string, lineId: string, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const file = formData.get("file") as File;
  if (!file || file.size === 0) throw new Error("파일이 없습니다");

  const ext = file.name.split(".").pop();
  const path = `${user.id}/${productId}-${Date.now()}.${ext}`;
  const url = await uploadToStorage("product-media", path, file);

  await supabase.from("product_media").insert({
    product_id: productId,
    url,
    type: "image",
    is_primary: false,
  });

  revalidatePath(`/dashboard/products/${lineId}`);
  return url;
}

// 브랜드 로고
export async function uploadBrandLogo(brandId: string, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const file = formData.get("file") as File;
  if (!file || file.size === 0) throw new Error("파일이 없습니다");

  const ext = file.name.split(".").pop();
  const path = `${user.id}/logo.${ext}`;
  const url = await uploadToStorage("brand-logos", path, file);

  await supabase.from("brands").update({ logo_url: url }).eq("id", brandId);
  revalidatePath("/dashboard/settings");
  return url;
}

// 소재 스와치 (이전 호환용)
export async function uploadFabricSwatch(fabricId: string, formData: FormData) {
  return uploadFabricImage(fabricId, "swatch_url", formData);
}
