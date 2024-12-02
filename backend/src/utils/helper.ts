import { PostgrestError } from "@supabase/supabase-js";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function isPostgrestError(obj: any): obj is PostgrestError {
  if (typeof obj === "object") return "code" in obj;
  return false;
}
