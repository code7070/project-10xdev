import { createClient } from "@supabase/supabase-js";

export default function supabase() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
  );
}

export const Supabase = supabase();
