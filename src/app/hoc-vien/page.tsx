import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProducts } from "@/lib/queries/products";
import { getUnlockedSlugs } from "@/lib/queries/unlocks";
import HocVienClient from "./HocVienClient";

export const metadata = {
  title: "Học viện",
};

export default async function HocVienPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/dang-nhap?next=/hoc-vien");
  }

  const [products, unlockedSlugs, profileResult] = await Promise.all([
    getProducts(),
    getUnlockedSlugs(user.id),
    supabase.from("profiles").select("role").eq("id", user.id).maybeSingle(),
  ]);

  const activeProducts = products.filter((p) => p.is_active);

  return (
    <HocVienClient
      products={activeProducts}
      initialUnlockedSlugs={unlockedSlugs}
      isAdmin={profileResult.data?.role === "admin"}
    />
  );
}
