export type TTaskStatus = "In Progress" | "Completed" | "Not Started";

export interface TTask {
  id: number;
  title: string;
  status: TTaskStatus;
  assignee: string;
  dueDate: string;
  projectId: number;
}

export interface TEmployee {
  id: number;
  name: string;
}

export interface TProject {
  id: number;
  name: string;
}

export interface TTaskByProject extends TProject {
  tasks: TTask[];
  progress: number;
  completedTasks: number;
  totalTasks: number;
}
