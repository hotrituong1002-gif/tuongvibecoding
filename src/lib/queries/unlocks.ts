import { createClient } from "@/lib/supabase/server";

export async function getUnlockedSlugs(userId: string): Promise<string[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("unlocks")
      .select("product_slug")
      .eq("user_id", userId);

    if (error) return [];
    return (data ?? []).map((row) => row.product_slug);
  } catch {
    return [];
  }
}
