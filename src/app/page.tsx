import { TaskList } from "@/components/dashboard/task-list";
import { DashboardOverview } from "@/components/dashboard/overview";
import { EmployeeManagement } from "@/components/management";

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">PM Task Manager</h1>
        <EmployeeManagement />
      </div>
      <DashboardOverview />
      <TaskList />
    </div>
  );
}
