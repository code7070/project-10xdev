import { format } from "date-fns";
import { ArrowUpRight, Calendar } from "lucide-react";
import Link from "next/link";
import style from "@/styles/task-display.module.scss";
import { Task } from "@/types";
import EmployeeAvatar from "../project/avatar";
import { ReactNode } from "react";

export default function TaskListDisplay({
  tasks,
  title = "Title",
  subtitle = "Subtitle",
}: {
  tasks?: Partial<Task[]>;
  title?: string;
  subtitle?: string | ReactNode;
}) {
  return (
    <div className={style.taskDisplay}>
      <div className="flex-1">
        <div className={style.title}>{title}</div>
        <div className={style.subtitle}>{subtitle}</div>
      </div>
      <div>
        {tasks?.map((i) => (
          <div key={i?.id} className={style.taskItem}>
            <div className="flex items-start gap-2.5">
              {/* <div className={style.checkBox}>
                <div className=""></div>
              </div> */}
              <div>
                <div className={style.name}>{i?.name}</div>
                <div className={style.infoWrapper}>
                  {/* <div className={style.project}>
                    in {i?.project?.name || ""}
                  </div> */}
                  <div className={style.project}>Due</div>
                  <div className={style.date}>
                    <Calendar className="size-3" />
                    {i?.due_date && format(i?.due_date || "", "MMM do yyy")}
                  </div>
                </div>
              </div>
            </div>
            {i?.people ? (
              <div className="flex items-center gap-2 text-xs">
                <div>{i.people.name}</div>
                <EmployeeAvatar {...i.people} />
              </div>
            ) : (
              <Link href={`/task/${i?.id}`} className={style.ctaView}>
                <span>View</span>
                <ArrowUpRight className="size-3" />
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
