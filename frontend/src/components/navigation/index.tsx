"use client";

import {
  Briefcase,
  Calendar,
  CheckSquare,
  LayoutDashboard,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import style from "@/styles/navside.module.scss";
import BrandArrow from "@/components/brand-arrow";
import BrandStamp from "@/components/brand-stamp";
import { motion } from "framer-motion";

export default function NavigationSide() {
  const path = usePathname();

  const link = [
    { name: "Dashboard", href: "/", icon: <LayoutDashboard /> },
    { name: "Projects", href: "/project", icon: <Briefcase /> },
    { name: "My Tasks", href: "/tasks", icon: <CheckSquare /> },
    { name: "Teams", href: "/teams", icon: <Users /> },
  ];

  function isActive(href: string) {
    if (href === "/") return href === path;
    return path.includes(href);
  }

  return (
    <aside className={style.navside}>
      <div className={style.wrapper}>
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { delayChildren: 0.2, staggerChildren: 0.3 },
            },
          }}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className={style.topSet}
        >
          <h1 className="px-4">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="brand-text"
            >
              PMS
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-lg"
            >
              Project Manager Sheet
            </motion.div>
          </h1>
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { delayChildren: 0.2, staggerChildren: 0.15 },
              },
            }}
            className="flex flex-col gap-2"
          >
            {link.map((i) => (
              <motion.div
                key={i.href}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <Link
                  href={i.href}
                  className={
                    style[`navItem${isActive(i.href) ? "Active" : ""}`]
                  }
                >
                  {i.icon}
                  {i.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        <div className={style.bottomSet}>
          <div className={style.dueBox}>
            <div className={style.title}>
              <Calendar className="size-4" />
              <div>Due today</div>
            </div>
            <div className={style.tasks}>3 Tasks</div>
            <Link href="/tasks?filter=today" className={style.details}>
              <div>Show details</div>
              <BrandArrow size="sm" circleColor="black" arrowColor="white" />
            </Link>
          </div>
          <BrandStamp />
        </div>
      </div>
    </aside>
  );
}
