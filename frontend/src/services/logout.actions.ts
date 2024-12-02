"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function logoutService() {
  //   Cookie Declare
  const cookie = await cookies();
  cookie.delete("pms-token");
  revalidatePath("/");
}
