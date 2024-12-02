import NavigationSide from "@/components/navigation";
import ClientLayout from "./client-layout";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookie = await cookies();
  const token = cookie.get("pms-token")?.value;

  const headersList = await headers();
  const pathname = headersList.get("x-invoke-path") || "/";

  if (!token && pathname !== "/") redirect("/login");

  return (
    <main className="flex">
      <NavigationSide />
      <ClientLayout>{children}</ClientLayout>
    </main>
  );
}
