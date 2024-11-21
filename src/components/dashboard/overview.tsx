import { tasks } from "@/lib/data";
import CardOverview from "./card";

export function DashboardOverview() {
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress");
  const completedTasks = tasks.filter((task) => task.status === "Completed");
  // const notStartedTasks = tasks.filter(task => task.status === "Not Started")
  const overdueTasks = tasks.filter(
    (task) => new Date(task.dueDate) < new Date()
  );

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <CardOverview tasks={tasks} title="Total Tasks" />
      <CardOverview tasks={inProgressTasks} title="In Progress" />
      <CardOverview tasks={completedTasks} title="Completed" />
      <CardOverview tasks={overdueTasks} title="Overdue" />
    </div>
  );
}
