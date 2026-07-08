"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function parseOutcomes(raw: string): string[] {
  return raw
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function readProductPayload(formData: FormData) {
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    tag: String(formData.get("tag") ?? "").trim(),
    badge: String(formData.get("badge") ?? "Khóa"),
    kind: String(formData.get("kind") ?? "combo"),
    price: Number(formData.get("price") ?? 0),
    lessons_count: Number(formData.get("lessons_count") ?? 0),
    cover: String(
      formData.get("cover") ?? "from-zinc-800 via-zinc-900 to-black",
    ).trim(),
    description: String(formData.get("description") ?? "").trim(),
    outcomes: parseOutcomes(String(formData.get("outcomes") ?? "")),
    sort_order: Number(formData.get("sort_order") ?? 0),
    is_active: formData.get("is_active") === "on",
  };
}

function revalidatePublicPages() {
  revalidatePath("/admin/products");
  revalidatePath("/");
  revalidatePath("/san-pham");
  revalidatePath("/hoc-vien");
}

export async function createProduct(formData: FormData) {
  const supabase = await createClient();
  const payload = readProductPayload(formData);

  const { error } = await supabase.from("products").insert(payload);
  if (error) throw new Error(error.message);

  revalidatePublicPages();
  redirect("/admin/products");
}

export async function updateProduct(id: string, formData: FormData) {
  const supabase = await createClient();
  const payload = readProductPayload(formData);

  const { error } = await supabase
    .from("products")
    .update(payload)
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePublicPages();
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePublicPages();
}
