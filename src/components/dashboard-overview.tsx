import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { tasks } from "@/lib/data"

export function DashboardOverview() {
  const totalTasks = tasks.length
  const inProgressTasks = tasks.filter(task => task.status === "In Progress")
  const completedTasks = tasks.filter(task => task.status === "Completed")
  const notStartedTasks = tasks.filter(task => task.status === "Not Started")
  const overdueTasks = tasks.filter(task => new Date(task.dueDate) < new Date())

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalTasks}</div>
          <p className="text-xs text-muted-foreground">
            {tasks[0]?.title || "No tasks"}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">In Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{inProgressTasks.length}</div>
          <p className="text-xs text-muted-foreground">
            {inProgressTasks[0]?.title || "No tasks in progress"}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completedTasks.length}</div>
          <p className="text-xs text-muted-foreground">
            {completedTasks[0]?.title || "No completed tasks"}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Overdue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{overdueTasks.length}</div>
          <p className="text-xs text-muted-foreground">
            {overdueTasks[0]?.title || "No overdue tasks"}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

