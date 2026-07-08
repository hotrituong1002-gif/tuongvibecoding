"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updateBundlePrice(formData: FormData) {
  const price = Number(formData.get("bundle_price") ?? 0);
  const supabase = await createClient();

  const { error } = await supabase
    .from("settings")
    .upsert({ key: "bundle_price", value: price });

  if (error) throw new Error(error.message);
  revalidatePath("/admin/settings");
  revalidatePath("/san-pham");
}
