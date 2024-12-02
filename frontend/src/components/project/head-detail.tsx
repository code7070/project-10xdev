import { ApiResponse, ProjectDetail } from "@/types";
import { Calendar, Edit, Loader, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import AddTask from "./add-task";
import { KeyedMutator } from "swr";

interface HeadDetailProps extends Partial<ProjectDetail> {
  isLoading: boolean;
  mutate: KeyedMutator<false | ApiResponse<ProjectDetail>>;
}

export default function ProjectHeadDetail({
  isLoading,
  mutate,
  ...item
}: HeadDetailProps) {
  const { color, name, status, due_date, description } = item;

  const dueDate = due_date ? format(new Date(due_date), "do MM yyy") : "-";

  return (
    <div
      className="projectBannerCreate green"
      style={color ? { backgroundColor: color } : {}}
    >
      <div className="inner">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="title">{name}</h1>
            {description && (
              <div className="desc !text-white">{description}</div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="rounded-full py-0.5 px-2 bg-white/20 text-xs tracking-wide font-semibold">
              {status}
            </div>
            <div className="flex items-center gap-2 text-sm opacity-80">
              <Calendar className="size-4" />
              <div>{dueDate}</div>
            </div>
          </div>
        </div>
        <div>
          {isLoading ? (
            <Loader className="size-8 animate-spin" />
          ) : (
            <div className="flex gap-2 w-full">
              <Button variant="destructive" size="lg">
                <Trash />
              </Button>
              <Button size="lg">
                <Edit />
              </Button>
              <AddTask item={item} mutate={mutate} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
