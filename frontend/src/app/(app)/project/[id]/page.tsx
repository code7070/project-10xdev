"use client";

import { ProjectDetail } from "@/types";
import "@/styles/project-create.css";
import { useProjectDetail } from "@/services/useProjectServices";
import { useParams } from "next/navigation";
import ProjectHeadDetail from "@/components/project/head-detail";
import TaskListDisplay from "@/components/ui/task-display";
import { Loader } from "lucide-react";

export type IActionState = [
  state: boolean | string,
  dispatch: (payload: string) => void,
  isPending: boolean,
];

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>();

  const { data, isLoading, mutate, isValidating } = useProjectDetail(
    true,
    params.id,
  );

  let project: Partial<ProjectDetail> = {};
  if (data && data.data) {
    project = data.data;
  }

  return (
    <div className="page-wrapper projectPage mb-40">
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
