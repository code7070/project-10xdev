import Login from "@/components/login";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const cookie = await cookies();
  const token = cookie.get("pms-token")?.value;
  if (token) redirect("/");
  return <Login token={token} />;
}
