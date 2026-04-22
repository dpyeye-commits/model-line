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

export async function uploadFabricSwatch(fabricId: string, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const file = formData.get("file") as File;
  if (!file || file.size === 0) throw new Error("파일이 없습니다");

  const ext = file.name.split(".").pop();
  const path = `${user.id}/${fabricId}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const service = getServiceClient();
  const { error } = await service.storage
    .from("fabric-swatches")
    .upload(path, buffer, { contentType: file.type, upsert: true });

  if (error) throw new Error(error.message);

  const { data: { publicUrl } } = service.storage
    .from("fabric-swatches")
    .getPublicUrl(path);

  await supabase.from("fabrics").update({ swatch_url: publicUrl }).eq("id", fabricId);
  revalidatePath("/dashboard/fabrics");
  return publicUrl;
}

export async function uploadProductImage(productId: string, lineId: string, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const file = formData.get("file") as File;
  if (!file || file.size === 0) throw new Error("파일이 없습니다");

  const ext = file.name.split(".").pop();
  const path = `${user.id}/${productId}-${Date.now()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const service = getServiceClient();
  const { error } = await service.storage
    .from("product-media")
    .upload(path, buffer, { contentType: file.type, upsert: false });

  if (error) throw new Error(error.message);

  const { data: { publicUrl } } = service.storage
    .from("product-media")
    .getPublicUrl(path);

  await supabase.from("product_media").insert({
    product_id: productId,
    url: publicUrl,
    type: "image",
    is_primary: false,
  });

  revalidatePath(`/dashboard/products/${lineId}`);
  return publicUrl;
}

export async function uploadBrandLogo(brandId: string, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const file = formData.get("file") as File;
  if (!file || file.size === 0) throw new Error("파일이 없습니다");

  const ext = file.name.split(".").pop();
  const path = `${user.id}/logo.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const service = getServiceClient();
  const { error } = await service.storage
    .from("brand-logos")
    .upload(path, buffer, { contentType: file.type, upsert: true });

  if (error) throw new Error(error.message);

  const { data: { publicUrl } } = service.storage
    .from("brand-logos")
    .getPublicUrl(path);

  await supabase.from("brands").update({ logo_url: publicUrl }).eq("id", brandId);
  revalidatePath("/dashboard/settings");
  return publicUrl;
}
