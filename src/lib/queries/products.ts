import { createClient } from "@/lib/supabase/server";
import type { Product } from "@/lib/types";

/**
 * Returns products visible to the current viewer: everyone sees active
 * products, admins also see inactive ones (enforced by RLS policy
 * "products_select", not by this function).
 */
export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data ?? [];
}
