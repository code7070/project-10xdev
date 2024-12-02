import { DashboardService } from "@/services/dashboard.service";

import TaskListDisplay from "../ui/task-display";

const dashboard = new DashboardService();

export default function DashboardTaskAction() {
  const tasks = dashboard.dummyOverdueTasks();

  return (
    <TaskListDisplay
      tasks={tasks}
      title="Need Action"
      subtitle="Upcoming overdue tasks"
    />
  );
}
