"use client";

import { ProjectDetail } from "@/types";
import "@/styles/project-create.css";
import { useProjectDetail } from "@/services/useProjectServices";
import { useParams } from "next/navigation";
import ProjectHeadDetail from "@/components/project/head-detail";
import TaskListDisplay from "@/components/ui/task-display";
import { Loader } from "lucide-react";

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>();

  const { data, isLoading, mutate, isValidating } = useProjectDetail(
    true,
    params.id
  );

  let project: Partial<ProjectDetail> = {};
  if (data && data.data) {
    project = data.data;
  }

  return (
    <div className="px-8 mt-6 flex flex-col gap-6 projectPage mb-40">
      <ProjectHeadDetail {...project} isLoading={isLoading} mutate={mutate} />
      <TaskListDisplay
        title="Task List"
        subtitle={
          <div className="flex gap-2">
            <div>List of task in this project</div>
            {isLoading ||
              (isValidating && <Loader className="size-5 animate-spin" />)}
          </div>
        }
        tasks={project.tasks}
      />
    </div>
  );
}
