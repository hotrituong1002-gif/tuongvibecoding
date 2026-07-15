"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createLesson(slug: string, formData: FormData) {
  const supabase = await createClient();

  const { data: maxRow } = await supabase
    .from("lessons")
    .select("sort_order")
    .eq("product_slug", slug)
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  const nextSortOrder = (maxRow?.sort_order ?? -1) + 1;

  const { error } = await supabase.from("lessons").insert({
    product_slug: slug,
    title: String(formData.get("title") ?? ""),
    content: String(formData.get("content") ?? ""),
    video_url: String(formData.get("video_url") ?? "").trim() || null,
    sort_order: nextSortOrder,
  });

  if (error) throw new Error(error.message);
  revalidatePath(`/admin/lessons/${slug}`);
  revalidatePath(`/hoc-vien/${slug}`);
  redirect(`/admin/lessons/${slug}`);
}

export async function updateLesson(
  slug: string,
  lessonId: string,
  formData: FormData,
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("lessons")
    .update({
      title: String(formData.get("title") ?? ""),
      content: String(formData.get("content") ?? ""),
      video_url: String(formData.get("video_url") ?? "").trim() || null,
      sort_order: Number(formData.get("sort_order") ?? 0),
      is_active: formData.get("is_active") === "on",
    })
    .eq("id", lessonId);

  if (error) throw new Error(error.message);
  revalidatePath(`/admin/lessons/${slug}`);
  revalidatePath(`/hoc-vien/${slug}`);
  redirect(`/admin/lessons/${slug}`);
}

export async function deleteLesson(slug: string, lessonId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("lessons").delete().eq("id", lessonId);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/lessons/${slug}`);
  revalidatePath(`/hoc-vien/${slug}`);
}
