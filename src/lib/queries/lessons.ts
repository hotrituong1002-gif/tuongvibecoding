import { createClient } from "@/lib/supabase/server";
import type { Lesson } from "@/lib/types";

/**
 * RLS only returns rows for admins or users who have unlocked this product,
 * so an empty result here can mean either "no lessons yet" or "not unlocked".
 */
export async function getLessonsForProduct(slug: string): Promise<Lesson[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("product_slug", slug)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) return [];
  return data;
}
