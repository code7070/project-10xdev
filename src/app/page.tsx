import { DashboardOverview } from '@/components/dashboard-overview'
import { TaskList } from '@/components/task-list'
import { EmployeeManagement } from '@/components/employee-management'

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
  )
}

