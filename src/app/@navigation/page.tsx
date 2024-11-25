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

export default function NavSide() {
  const path = usePathname();

  const link = [
    { name: "Dashboard", href: "/", icon: <LayoutDashboard /> },
    { name: "Projects", href: "/projects", icon: <Briefcase /> },
    { name: "My Tasks", href: "/tasks", icon: <CheckSquare /> },
    { name: "Teams", href: "/teams", icon: <Users /> },
  ];

  function isActive(href: string) {
    if (href === "/") return "/";
    return path.includes(href);
  }

  return (
    <aside className={style.navside}>
      <div className={style.wrapper}>
        <div className={style.topSet}>
          <h1 className="px-4">
            <div className="brand-text">PMS</div>
            <div className="text-lg">Project Manager Sheet</div>
          </h1>
          <div className="flex flex-col gap-2">
            {link.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                className={style[`navItem${isActive(i.href) ? "Active" : ""}`]}
              >
                {i.icon}
                {i.name}
              </Link>
            ))}
          </div>
        </div>
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
