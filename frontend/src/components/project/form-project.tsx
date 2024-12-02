"use client";

import { ProjectDetail } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Button } from "../ui/button";
import {
  Calendar as CalendarIcon,
  Check,
  CheckCheck,
  Loader,
  Plus,
  Sparkles,
} from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { useState } from "react";
import {
  createProject,
  generateProjectByAI,
} from "@/services/useProjectServices";
import { motion, Variants } from "framer-motion";
import style from "@/styles/task-display.module.scss";
import PopupSelectEmployee from "./popup-select-employee";
import { Separator } from "../ui/separator";
import { v4 as uuid } from "uuid";
import { createTask } from "@/services/useTaskService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function FormProject({
  defaultValues,
}: {
  defaultValues?: Partial<ProjectDetail>;
}) {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"name" | "full">("name");

  const router = useRouter();

  const colors = [
    "#89221F",
    "#4B8FA1",
    "#FE6948",
    "#40769E",
    "#355D9A",
    "#C44634",
  ];

  const taskSchema = z.object({
    name: z.string(),
    due_date: z.string(),
    employee_id: z.string(),
    project_id: z.string(),
  });

  const schema = z.object({
    name: z.string(),
    description: z.string(),
    due_date: z.string(),
    color: z.string(),
    tasks: z.optional(z.array(taskSchema)),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: defaultValues?.name || "",
      description: defaultValues?.description || "",
      due_date: defaultValues?.due_date || new Date().toISOString(),
      color: defaultValues?.color || "",
      tasks: [],
    },
  });

  async function onSubmit(data: z.infer<typeof schema>) {
    const random = Math.floor(Math.random() * colors.length);
    const projectId = uuid();

    const project = { ...data, id: projectId };
    if (project.color === "") project.color = colors[random];
    if (project.tasks && project.tasks.length > 0) delete project.tasks;

    let tasks: Array<z.infer<typeof taskSchema>> = [];
    if (data.tasks && data.tasks.length > 0) {
      tasks = [...data.tasks].map((i) => ({ ...i, project_id: projectId }));
      const noEmployee = tasks.filter((i) => !i.employee_id).length > 0;
      if (noEmployee) return alert("Complete tasks with assignment");
    }

    setLoading(true);
    const resProject = await createProject(project);
    if (tasks.length > 0) {
      /* eslint-disable-next-line */
      const resTasks = await Promise.all(
        tasks.map(async (i) => await createTask(i)),
      );
    }
    setLoading(false);
    if (resProject.status === 200) {
      toast.success("Project berhasil dibuat");
      router.replace("/project");
    }
  }

  async function generateAI() {
    setLoading(true);
    const res = await generateProjectByAI(name);
    if (res && res.data) {
      form.setValue("description", res.data.description);
      form.setValue("due_date", res.data.due_date);
      form.setValue(
        "tasks",
        res.data.tasks.map((i) => ({ ...i, employee_id: "", project_id: "" })),
      );
      form.setValue("color", colors[Math.floor(Math.random() * colors.length)]);
    }
    setMode("full");
    setLoading(false);
  }

  const varWrapper: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.2, staggerChildren: 0.3 },
    },
  };

  const varField: Variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  };

  const varTask: Variants = {
    hidden: { opacity: 0, y: -20, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  const name = form.watch("name");
  const dueDate = form.watch("due_date");
  const color = form.watch("color");
  const tasks = form.watch("tasks");

  const hasName = name.length > 0;

  return (
    <Form {...form}>
      <form
        onSubmit={mode === "full" ? form.handleSubmit(onSubmit) : undefined}
        className="flex flex-col gap-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold uppercase">
                Project Name
              </FormLabel>
              <Input
                placeholder="Enter project name"
                className="!text-lg p-6"
                {...field}
              />
              <FormDescription>
                This is your projects display name
              </FormDescription>
            </FormItem>
          )}
        />
        {mode === "full" && (
          <motion.div
            variants={varWrapper}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="flex flex-col gap-8"
          >
            <motion.div variants={varField}>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold uppercase">
                      Description
                    </FormLabel>
                    <Textarea
                      placeholder="Enter project description"
                      className="!text-base"
                      rows={5}
                      {...field}
                    />
                    <FormDescription>
                      Project description to display on the project page
                    </FormDescription>
                  </FormItem>
                )}
              />
            </motion.div>
            <div className="flex h-20 items-start gap-6">
              <motion.div variants={varField}>
                <FormField
                  control={form.control}
                  name="due_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold uppercase">
                        Due Date
                      </FormLabel>
                      <div className="flex items-center gap-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" size="lg">
                              {format(dueDate, "do MMM yyy")}{" "}
                              <CalendarIcon className="ml-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <Calendar
                              mode="single"
                              selected={new Date(field.value)}
                              onSelect={(e) =>
                                form.setValue(
                                  "due_date",
                                  new Date(e || "").toISOString(),
                                )
                              }
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </FormItem>
                  )}
                />
              </motion.div>
              <Separator orientation="vertical" />
              <motion.div variants={varField} className="space-y-2">
                <FormLabel className="font-semibold uppercase">
                  Colors:
                </FormLabel>
                <div className="flex items-center gap-2">
                  {colors.map((i) => (
                    <Button
                      key={i}
                      size="icon"
                      style={{ backgroundColor: i }}
                      className="text-white"
                      onClick={() => form.setValue("color", i)}
                    >
                      {color === i && <Check className="!size-6" />}
                    </Button>
                  ))}
                </div>
              </motion.div>
            </div>
            <Separator />
            <div className="space-y-4">
              <FormLabel className="font-semibold uppercase">
                Tasks List
              </FormLabel>
              {tasks?.map((i, n) => (
                <motion.div
                  variants={varTask}
                  key={n}
                  className={`${style.taskItem} -mx-2`}
                >
                  <div className="flex items-start gap-2.5 flex-1">
                    <div className="w-full">
                      <div className={style.name}>
                        <FormField
                          control={form.control}
                          name={`tasks.${n}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Task Name</FormLabel>
                              <Input placeholder="Task Name" {...field} />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className={`${style.infoWrapper} mt-5 !gap-5`}>
                        <div className="flex flex-col gap-1">
                          <FormLabel>Due Date</FormLabel>
                          <FormField
                            control={form.control}
                            name={`tasks.${n}.due_date`}
                            render={({ field }) => (
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    {format(i?.due_date || "", "do MMM yyy")}{" "}
                                    <CalendarIcon className="ml-4" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                  <Calendar
                                    mode="single"
                                    selected={new Date(field.value || "")}
                                    onSelect={(date) =>
                                      field.onChange(date?.toISOString())
                                    }
                                  />
                                </PopoverContent>
                              </Popover>
                            )}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <FormLabel>Assignee</FormLabel>
                          <FormField
                            control={form.control}
                            name={`tasks.${n}.employee_id`}
                            render={({ field }) => (
                              <PopupSelectEmployee
                                onSelect={(user) => field.onChange(user.id)}
                              />
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        <div className="flex justify-end mt-8">
          {mode === "full" ? (
            <Button
              type="submit"
              className="flex gap-2"
              size="lg"
              disabled={loading}
            >
              {loading ? <Loader className="animate-spin" /> : <CheckCheck />}{" "}
              SAVE PROJECT
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                size="lg"
                variant="outline"
                onClick={() => setMode("full")}
                disabled={!hasName}
              >
                <Plus className="mr-2" /> Buat Manual
              </Button>
              <Button
                size="lg"
                variant="outline"
                disabled={loading || !hasName}
                onClick={generateAI}
              >
                {loading ? (
                  <Loader className="animate-spin" />
                ) : (
                  <Sparkles className={`fill-primary-foreground`} />
                )}
                Lanjutkan dengan AI
              </Button>
            </div>
          )}
        </div>
      </form>
    </Form>
  );
}
