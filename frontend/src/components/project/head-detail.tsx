import { ApiResponse, ProjectDetail } from "@/types";
import { Calendar, Edit, Loader, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import AddTask from "./add-task";
import { KeyedMutator } from "swr";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { deleteProject } from "@/services/useProjectServices";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface HeadDetailProps extends Partial<ProjectDetail> {
  isLoading: boolean;
  mutate: KeyedMutator<false | ApiResponse<ProjectDetail>>;
}

export default function ProjectHeadDetail({
  isLoading,
  mutate,
  ...item
}: HeadDetailProps) {
  const router = useRouter();

  const { color, name, status, due_date, description, id, deleted_at } = item;
  const [loading, setLoading] = useState(false);

  async function doDeleteProject() {
    setLoading(true);
    if (id) await deleteProject(id);
    mutate();
    setLoading(false);
    toast.success("Project berhasil dihapus");
    router.replace("/project");
    // console.log("deleting id: ", id);
    // if (onDelete && id) onDelete(id);
  }

  const dueDate = due_date ? format(new Date(due_date), "do MMM yyy") : "-";

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
              <div className="desc !text-white line-clamp-3 font-semibold">
                {description}
              </div>
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
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="destructive"
                    size="lg"
                    disabled={!!deleted_at}
                  >
                    <Trash />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>
                    Are you sure you want to delete this project?
                  </DialogTitle>
                  <DialogDescription>
                    This action cannot be undone.
                  </DialogDescription>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        variant="destructive"
                        onClick={doDeleteProject}
                        disabled={!!deleted_at || loading}
                      >
                        {isLoading && <Loader className="animate-spin" />}
                        Delete
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button size="lg" disabled={!!deleted_at} asChild={!deleted_at}>
                <Link href={`/project/${item.id}/edit`}>
                  <Edit />
                </Link>
              </Button>
              <AddTask item={item} mutate={mutate} disabled={!!deleted_at} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
