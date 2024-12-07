import CreateBanner from "@/components/project/create-banner";
import ProjectList from "@/components/project/list";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProjectsPage() {
  const cookie = await cookies();
  const token = cookie.get("pms-token")?.value;

  if (!token) redirect("/login");

  const isLogin = !!token;

  return (
    <div className="page-wrapper projectPage mb-40">
      <CreateBanner />
      <ProjectList isLogin={isLogin} />
    </div>
  );
}
