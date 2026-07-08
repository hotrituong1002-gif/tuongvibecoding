import { createClient } from "@/lib/supabase/server";
import type { Product } from "@/lib/types";
import { DEMO_PRODUCTS } from "@/lib/demo-data";

/**
 * Returns products visible to the current viewer: everyone sees active
 * products, admins also see inactive ones (enforced by RLS policy
 * "products_select", not by this function).
 *
 * Falls back to bundled demo content if Supabase isn't reachable yet
 * (e.g. env vars still hold placeholder values) so the public pages keep
 * working while the real project is being set up.
 */
export async function getProducts(): Promise<Product[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) return DEMO_PRODUCTS;
    return data;
  } catch {
    return DEMO_PRODUCTS;
  }
}
