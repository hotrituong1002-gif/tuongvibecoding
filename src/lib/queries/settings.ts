import { createClient } from "@/lib/supabase/server";

export async function getSetting<T>(key: string, fallback: T): Promise<T> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("settings")
      .select("value")
      .eq("key", key)
      .maybeSingle();

    return (data?.value as T) ?? fallback;
  } catch {
    return fallback;
  }
}
