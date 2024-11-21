import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CloudLightningIcon as Lucide } from "lucide-react";
import { projects, tasks } from "@/lib/data";

export function ProjectDetail({ projectId }: { projectId: number }) {
  const project = projects.find((p) => p.id === projectId);
  const projectTasks = tasks.filter((t) => t.projectId === projectId);

  if (!project) {
    return <div>Project not found</div>;
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return (
          <Lucide icon="CheckCircle2" className="h-5 w-5 text-green-500" />
        );
      case "In Progress":
        return <Lucide icon="Clock" className="h-5 w-5 text-yellow-500" />;
      default:
        return <Lucide icon="Circle" className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{project.name}</h1>
        <Button asChild>
          <Link href="/">Back to Dashboard</Link>
        </Button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p>{project.description}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Attachments</h2>
        <ul className="list-disc list-inside">
          {project.attachments.map((attachment, index) => (
            <li key={index}>
              <a
                href={attachment.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {attachment.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Tasks</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead>Due Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projectTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{getStatusIcon(task.status)}</TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.assignee}</TableCell>
                <TableCell>{task.dueDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
