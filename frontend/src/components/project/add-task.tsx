import { Loader, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ApiResponse, ProjectDetail } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import z from "zod";
import { useEmployee } from "@/services/useEmployeeService";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState } from "react";
import { createTask } from "@/services/useTaskService";
import { toast } from "sonner";
import { KeyedMutator } from "swr";
import { format } from "date-fns";
import SelectEmployee from "./select-employee";

export default function AddTask({
  item,
  mutate,
}: {
  item: Partial<ProjectDetail>;
  mutate: KeyedMutator<false | ApiResponse<ProjectDetail>>;
}) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { data } = useEmployee({ isLogin: true });

  const schema = z.object({
    name: z.string(),
    employee_id: z.string(),
    due_date: z.string(),
    project_id: z.string(),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      employee_id: "",
      due_date: new Date().toISOString(),
      project_id: item.id,
    },
  });

  async function onSubmit(data: z.infer<typeof schema>) {
    setLoading(true);
    console.log("submit: ", data);
    const res = await createTask(data);
    if (res.status === 200) toast.success("Task berhasil dibuat");
    form.reset();
    setOpen(false);
    mutate();
    console.log("Response: ", res);
    setLoading(false);
  }

  const employeeId = form.watch("employee_id");
  const name = form.watch("name");
  const dueDate = form.watch("due_date");

  const nodata = !employeeId || !name || !dueDate;

  return (
    <Dialog
      onOpenChange={(e) => {
        form.reset();
        setOpen(e);
      }}
      open={open}
    >
      <DialogTrigger asChild>
        <Button variant="appWhite" size="lg">
          <Plus /> Add New Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="flex flex-col gap-6">
            <div className="font-semibold text-lg">{item.name}</div>
            <div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Name</FormLabel>
                    <FormControl>
                      <Input placeholder="DevScale" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="due_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <div className="flex gap-2 items-center">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button>Due Date</Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Calendar
                          mode="single"
                          selected={new Date(field.value)}
                          onSelect={(date) =>
                            form.setValue(
                              "due_date",
                              new Date(date || "").toISOString(),
                            )
                          }
                        />
                      </PopoverContent>
                    </Popover>
                    <div className="text-sm text-gray-500 font-semibold">
                      {format(dueDate, "do MMM yyy")}
                    </div>
                  </div>
                </FormItem>
              )}
            />
            <div>
              <div>Choose workers:</div>
              {data ? (
                <div className="grid grid-cols-3 gap-2 flex-wrap max-h-[200px] overflow-y-auto">
                  <SelectEmployee
                    list={data}
                    selected={employeeId}
                    onSelect={(e) => form.setValue("employee_id", e)}
                  />
                </div>
              ) : (
                <Loader className="size-5 animate-spin" />
              )}
            </div>
          </form>
        </Form>
        <DialogFooter>
          <Button
            disabled={loading || nodata}
            onClick={form.handleSubmit(onSubmit)}
          >
            {loading ? <Loader className="animate-spin" /> : <Plus />} Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
