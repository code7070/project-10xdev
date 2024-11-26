"use client";

import DashboardGreeting from "@/components/dashboard/greeting";
import DashboardProjects from "@/components/dashboard/projects";
import DashboardSearch from "@/components/dashboard/search";
import DashboardTaskAction from "@/components/dashboard/task-action";
import DashboardTaskProgress from "@/components/dashboard/task-progress";
import DashboardTasks from "@/components/dashboard/tasks";
import DashboardUpcoming from "@/components/dashboard/upcoming";
import NavigationSide from "@/components/navigation";
import ProfileBadge from "@/components/profile-badge";
import { AuthContext } from "@/services/useAuth";
import { motion, Variants } from "framer-motion";
import { useContext } from "react";

export default function Home() {
  const auth = useContext(AuthContext);

  const vars: Variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <main className="flex">
      <NavigationSide />
      <div className="flex-1 flex flex-col gap-6">
        <ProfileBadge {...auth} />
        <div className="flex flex-col gap-6 w-full pb-20">
          <DashboardGreeting name={auth.name || "Ganteng"} />
          <DashboardSearch />
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { delayChildren: 0.1, staggerChildren: 0.2 },
              },
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="px-8 mt-6 flex flex-col gap-6"
          >
            <section className="grid grid-cols-[2fr_1fr_1fr] gap-4">
              <motion.div variants={vars}>
                <DashboardUpcoming />
              </motion.div>
              <motion.div variants={vars}>
                <DashboardProjects />
              </motion.div>
              <motion.div variants={vars}>
                <DashboardTasks />
              </motion.div>
            </section>
            <section className="grid grid-cols-2 gap-4">
              <motion.div variants={vars}>
                <DashboardTaskAction />
              </motion.div>
              <motion.div variants={vars}>
                <DashboardTaskProgress />
              </motion.div>
            </section>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
