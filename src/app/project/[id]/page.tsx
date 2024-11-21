import { ProjectDetail } from "@/components/project/detail";

export default function ProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const projectId = parseInt(params.id, 10);
  return <ProjectDetail projectId={projectId} />;
}
