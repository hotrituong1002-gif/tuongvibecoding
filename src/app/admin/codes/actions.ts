"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function randomCode(length = 10) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < length; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

export async function createActivationCode(formData: FormData) {
  const supabase = await createClient();

  const customCode = String(formData.get("code") ?? "").trim();
  const code = (customCode || randomCode()).toUpperCase();
  const scope = String(formData.get("scope") ?? "bundle");
  const maxUses = Math.max(1, Number(formData.get("max_uses") ?? 1));
  const note = String(formData.get("note") ?? "").trim();
  const expiresAtRaw = String(formData.get("expires_at") ?? "").trim();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("activation_codes").insert({
    code,
    scope,
    max_uses: maxUses,
    note: note || null,
    expires_at: expiresAtRaw ? new Date(expiresAtRaw).toISOString() : null,
    created_by: user?.id ?? null,
  });

  if (error) throw new Error(error.message);
  revalidatePath("/admin/codes");
}

export async function toggleActivationCode(id: string, nextActive: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("activation_codes")
    .update({ is_active: nextActive })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/codes");
}

export async function deleteActivationCode(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("activation_codes")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/codes");
}
