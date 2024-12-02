import NavigationSide from "@/components/navigation";
import ClientLayout from "./client-layout";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookie = await cookies();

  const token = cookie.get("pms-token")?.value;

  if (!token) redirect("/login");

  return (
    <main className="flex">
      <NavigationSide />
      <ClientLayout>{children}</ClientLayout>
    </main>
  );
}
