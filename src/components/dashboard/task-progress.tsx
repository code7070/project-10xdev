import { DashboardService } from "@/services/dashboard.service";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Link from "next/link";

const service = new DashboardService();

export default function DashboardTaskProgress() {
  const ranged = service.getRangeDate();

  return (
    <div className="relative size-full rounded-app-radius bg-app-orange text-white py-8 px-6 flex flex-col gap-4 justify-between">
      <div className="flex justify-between">
        <div className="text-[28px] font-semibold font-secondary flex-1">
          Progress
        </div>
        <Link
          href="#"
          className="flex gap-2 items-center bg-white text-app-orange p-1 pl-2 pr-3 rounded-full !h-auto !min-h-0 text-sm"
        >
          <Search className="size-4" />
          <div>Analyze with AI</div>
        </Link>
      </div>
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { delayChildren: 1.2, staggerChildren: 0.1 },
          },
        }}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="flex justify-center gap-5"
      >
        {ranged.map((r, n) => (
          <div key={n} className="text-xs">
            <div className="rounded-full h-[120px] bg-white/20 relative overflow-hidden">
              <motion.div
                variants={{
                  hidden: { height: 0 },
                  visible: {
                    height: Math.floor(Math.random() * (120 - 10 + 1)) + 10,
                  },
                }}
                className="absolute left-0 bottom-0 w-full h-20 bg-white rounded-full"
              />
            </div>
            <div>{format(r, "MMM d")}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
