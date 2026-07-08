import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Bypasses Row Level Security entirely — only for trusted server code that
 * has already authenticated its caller by other means (e.g. the SePay
 * webhook, which checks a shared secret header before ever touching this
 * client). Never import this from a "use client" file or a normal
 * user-facing server action.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}
