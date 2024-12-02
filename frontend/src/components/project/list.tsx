"use client";

import useProjectList from "@/services/useProjectServices";
import ProjectCardSummary from "./card-summary";
import { Loader } from "lucide-react";
import { motion } from "framer-motion";

export default function ProjectList({ isLogin }: { isLogin: boolean }) {
  const { data, isLoading } = useProjectList(isLogin);

  return (
    <div>
      {isLoading && (
        <div className="col-span-2 flex items-center justify-center">
          <Loader className="size-10 animate-spin mx-auto" />
        </div>
      )}

      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { delayChildren: 0.25, staggerChildren: 0.2 },
          },
        }}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="grid grid-cols-2 gap-6"
      >
        {data &&
          data.data &&
          data.data?.map((i) => (
            <ProjectCardSummary key={i} id={i} isLogin={isLogin} />
          ))}
      </motion.div>
    </div>
  );
}
