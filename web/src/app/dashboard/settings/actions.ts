"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function updateBrand(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const name = formData.get("name") as string;
  const description = formData.get("description") as string || null;
  const website = formData.get("website") as string || null;
  const country = formData.get("country") as string || "KR";

  const { error } = await supabase
    .from("brands")
    .update({ name, description, website, country, updated_at: new Date().toISOString() })
    .eq("user_id", user.id);

  if (error) redirect(`/dashboard/settings?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/settings");
  redirect("/dashboard/settings?saved=1");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
