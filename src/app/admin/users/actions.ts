"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function setUserRole(userId: string, role: "admin" | "customer") {
  const supabase = await createClient();
  const { error } = await supabase
    .from("profiles")
    .update({ role })
    .eq("id", userId);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/users");
  revalidatePath(`/admin/users/${userId}`);
}

export async function grantProductAccess(userId: string, productSlug: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("unlocks").insert({
    user_id: userId,
    product_slug: productSlug,
    source: "admin_grant",
  });

  if (error && error.code !== "23505") throw new Error(error.message);
  revalidatePath(`/admin/users/${userId}`);
}

export async function revokeProductAccess(userId: string, productSlug: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("unlocks")
    .delete()
    .eq("user_id", userId)
    .eq("product_slug", productSlug);

  if (error) throw new Error(error.message);
  revalidatePath(`/admin/users/${userId}`);
}
