"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TaskForm } from "@/components/dashboard/task-form";
import { projects, tasks } from "@/lib/data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle, Clock } from "lucide-react";
import { TTask, TTaskByProject, TTaskStatus } from "@/lib/types";

export function TaskList() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<TTask | null>(null);

  const tasksByProject: TTaskByProject[] = projects.map((project) => {
    const projectTasks = tasks.filter((task) => task.projectId === project.id);
    const completedTasks = projectTasks.filter(
      (task) => task.status === "Completed"
    ).length;
    const progress =
      projectTasks.length > 0
        ? (completedTasks / projectTasks.length) * 100
        : 0;
    return {
      ...project,
      tasks: projectTasks,
      progress,
      completedTasks,
      totalTasks: projectTasks.length,
    };
  });

  const getStatusIcon = (status: TTaskStatus) => {
    switch (status) {
      case "Completed":
        return <CheckCircle2 className="size-5 text-green-500" />;
      case "In Progress":
        return <Clock className="size-5 text-yellow-500" />;
      default:
        return <Circle className="size-5 text-gray-500" />;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Projects and Tasks</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add New Task</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
              <DialogDescription>
                Create a new task for your project.
              </DialogDescription>
            </DialogHeader>
            <TaskForm onSubmit={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      <Accordion type="single" collapsible className="w-full space-y-4">
        {tasksByProject.map((project) => (
          <AccordionItem
            key={project.id}
            value={`project-${project.id}`}
            className="border rounded-lg"
          >
            <AccordionTrigger className="px-4 py-2 hover:no-underline hover:bg-accent">
              <div className="flex items-center justify-between w-full">
                <span>{project.name}</span>
                <div className="flex items-center space-x-2">
                  <Progress value={project.progress} className="w-24" />
                  <span className="text-sm text-muted-foreground">
                    {project.completedTasks} / {project.totalTasks}
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-4 px-4"></TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Due Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {project.tasks.map((task) => (
                    <TableRow
                      key={task.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => setSelectedTask(task)}
                    >
                      <TableCell className="w-4 px-4">
                        {getStatusIcon(task.status)}
                      </TableCell>
                      <TableCell>{task.title}</TableCell>
                      <TableCell>{task.assignee}</TableCell>
                      <TableCell>{task.dueDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      {selectedTask && (
        <Dialog
          open={!!selectedTask}
          onOpenChange={() => setSelectedTask(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedTask.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              <p>
                <strong>Status:</strong> {selectedTask.status}
              </p>
              <p>
                <strong>Assignee:</strong> {selectedTask.assignee}
              </p>
              <p>
                <strong>Due Date:</strong> {selectedTask.dueDate}
              </p>
              <p>
                <strong>Project:</strong>{" "}
                {projects.find((p) => p.id === selectedTask.projectId)?.name}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
