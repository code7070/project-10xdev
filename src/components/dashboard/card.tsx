import { TTask } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CardOverview({
  title,
  tasks,
}: {
  tasks: TTask[];
  title: string;
}) {
  const totalTasks = tasks.length;
  const taskLimit = 3;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{totalTasks}</div>
        <div className="text-sm text-muted-foreground">
          <ul className="list-disc list-inside">
            {tasks.length > 0 &&
              tasks
                .slice(0, taskLimit)
                .map((i, n) => <li key={n}>{i.title}</li>)}
            {tasks.length > taskLimit && (
              <li className="">+{tasks.length - taskLimit} more</li>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
