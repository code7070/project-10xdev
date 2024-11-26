import { DashboardService } from "@/services/dashboard.service";
import { format } from "date-fns";
import { ArrowUpRight, Calendar } from "lucide-react";
import Link from "next/link";

const dashboard = new DashboardService();

export default function DashboardTaskAction() {
  const tasks = dashboard.dummyOverdueTasks();

  const finder = (id: number) => dashboard.findProjectNameById(id);

  return (
    <div
      className="relative size-full rounded-app-radius bg-white text-black py-8 px-6 flex flex-col gap-4"
      style={{
        backgroundImage: "url(/pattern-white-box.png)",
        backgroundPosition: "top right",
        backgroundSize: "400px",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex-1">
        <div className="text-[28px] font-semibold font-secondary">
          Need Action
        </div>
        <div className="font-medium text-sm text-gray-500">
          Upcoming overdue tasks
        </div>
      </div>
      <div>
        {tasks.map((i) => (
          <div
            key={i.id}
            className="py-3 flex items-start gap-2.5 w-full justify-between"
          >
            <div className="flex items-start gap-2.5">
              <div className="py-1">
                <div className="size-4 border border-app-orange rounded-md"></div>
              </div>
              <div>
                <div className="text-sm">{i.name}</div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="text-gray-500">in {finder(i.projectId)}</div>
                  <div className="flex items-center gap-1 text-red-500">
                    <Calendar className="size-3" />
                    {format(i.dueDate, "MMM do")}
                  </div>
                </div>
              </div>
            </div>
            <Link
              href={`/task/${i.id}`}
              className="flex items-center gap-2 p-2 pl-3 rounded-full border border-gray-200 bg-white hover:bg-gray-200 text-stone-700 text-xs"
            >
              <span>View</span>
              <ArrowUpRight className="size-3" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
