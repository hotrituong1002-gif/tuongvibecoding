import { createClient } from "@/lib/supabase/server";

export async function getSetting<T>(key: string, fallback: T): Promise<T> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("settings")
    .select("value")
    .eq("key", key)
    .maybeSingle();

  return (data?.value as T) ?? fallback;
}
