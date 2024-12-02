"use server";

import { FetchService } from "@/services/fetcher";
import { revalidatePath } from "next/cache";

export async function login(form: FormData) {
  //   Cookie Declare

  //   Form Declare
  const name = form.get("name") as string;
  const password = form.get("password") as string;

  const fetch = new FetchService();
  const endpoint = `${process.env.API_URL}/api/v1/user/login`;
  await fetch.POST(endpoint, { name, password });

  revalidatePath("/");
}
