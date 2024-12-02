"use client";

import { useTaskProgress } from "@/services/useDashboardService";
import { TaskProgress } from "@/types";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Loader, Search } from "lucide-react";
import Link from "next/link";

export default function DashboardTaskProgress({
  isLogin,
}: {
  isLogin: boolean;
}) {
  const date = format(new Date(), "yyy-MM-dd");
  const { data, isLoading } = useTaskProgress(isLogin, date);

  let list: false | TaskProgress[] = [];
  if (isLogin) list = data || [];

  return (
    <div className="relative size-full rounded-app-radius bg-app-orange text-white py-8 px-6 flex flex-col gap-4 justify-between">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-[28px] font-semibold font-secondary flex-1">
            Progress
          </div>
          <div className="font-medium text-sm">
            How many task done by due date
          </div>
        </div>
        {isLoading ? (
          <Loader className="size-10 animate-spin" />
        ) : (
          list &&
          list.length > 0 && (
            <Link
              href="#"
              className="flex gap-2 items-center bg-white text-app-orange p-2 pl-3 pr-4 rounded-full !h-auto !min-h-0 text-sm font-medium"
            >
              <Search className="size-4" />
              <div>Analyze with AI</div>
            </Link>
          )
        )}
      </div>
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { delayChildren: 1, staggerChildren: 0.5 },
          },
        }}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="grid grid-cols-9 justify-center gap-5"
      >
        {list && list.length > 0 ? (
          list.map((r, n) => (
            <div key={n} className="text-xs">
              <div className="rounded-full h-[120px] bg-white/20 relative overflow-hidden">
                <motion.div
                  variants={{
                    hidden: { height: 0 },
                    visible: {
                      height: `${
                        (r?.done?.length || 0) > 0
                          ? (r.done.length / r.data.length) * 100
                          : 0
                      }%`,
                    },
                  }}
                  className="absolute left-0 bottom-0 w-full h-20 bg-white rounded-full"
                  title={`Task done ${r.data.length}`}
                />
              </div>
              <div className="text-center font-semibold">
                {format(r.date, "MMM d")}
              </div>
              <div className="text-center opacity-50">
                {r.done?.length}/{r.data.length}
              </div>
            </div>
          ))
        ) : isLoading ? (
          <></>
        ) : (
          <div className="col-span-9">No progress data</div>
        )}
      </motion.div>
    </div>
  );
}
