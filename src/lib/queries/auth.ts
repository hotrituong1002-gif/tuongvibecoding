import { createClient } from "@/lib/supabase/server";

export type CurrentUser = {
  email: string | null;
  isAdmin: boolean;
};

export async function getCurrentUser(): Promise<CurrentUser | null> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    return { email: user.email ?? null, isAdmin: profile?.role === "admin" };
  } catch {
    return null;
  }
}
