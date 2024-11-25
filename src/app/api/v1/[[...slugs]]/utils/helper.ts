import { PostgrestError } from "@supabase/supabase-js";

export function isPostgrestError(obj: any): obj is PostgrestError {
  if (typeof obj === "object") return "code" in obj;
  return false;
}
