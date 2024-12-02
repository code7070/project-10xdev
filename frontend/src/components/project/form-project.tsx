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
import { useAIDescription } from "@/services/useProjectServices";
import { motion, Variants } from "framer-motion";

export default function FormProject({
  defaultValues,
}: {
  defaultValues?: Partial<ProjectDetail>;
}) {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"name" | "full">("name");

  const colors = [
    "#89221F",
    "#FE6948",
    "#4B8FA1",
    "#40769E",
    "#355D9A",
    "#C44634",
  ];

  const schema = z.object({
    name: z.string(),
    description: z.string(),
    due_date: z.string(),
    status: z.string(),
    color: z.string(),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: defaultValues?.name || "",
      description: defaultValues?.description || "",
      due_date: defaultValues?.due_date || new Date().toISOString(),
      status: defaultValues?.status || "",
      color: defaultValues?.color || "",
    },
  });

  async function onSubmit(data: z.infer<typeof schema>) {
    setLoading(true);
    const random = Math.floor(Math.random() * colors.length);
    const payload = { ...data };
    if (payload.color === "") payload.color = colors[random];
    console.log("submit: ", payload);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  const name = form.watch("name");
  const dueDate = form.watch("due_date");
  const color = form.watch("color");

  async function generateAI() {
    setLoading(true);
    const res = await useAIDescription(name);
    console.log("Res: ", res);
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <Input placeholder="Enter project name" {...field} />
              <FormDescription>
                This is your project's display name
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
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      placeholder="Enter project description"
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
            <div className="flex items-start gap-6">
              <motion.div variants={varField}>
                <FormField
                  control={form.control}
                  name="due_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Due Date</FormLabel>
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
                                  new Date(e || "").toISOString()
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
              <motion.div variants={varField} className="space-y-2">
                <FormLabel>Colors:</FormLabel>
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
                disabled={name.length < 1}
              >
                <Plus className="mr-2" /> Buat Manual
              </Button>
              <Button
                size="lg"
                variant="outline"
                disabled={loading || name.length < 1}
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
