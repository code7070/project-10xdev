"use client";

import { Project } from "@/types";
import "@/styles/card-summary.css";
import { differenceInDays, format } from "date-fns";
import { useProjectDetail } from "@/services/useProjectServices";
import { ArrowUpRight, Calendar, Loader } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { motion } from "framer-motion";
import EmployeeAvatar from "./avatar";

interface CardProps extends Partial<Project> {
  isLogin: boolean;
}

type TAmount = number | "99+";

export default function ProjectCardSummary({ id, isLogin }: CardProps) {
  const { data, isLoading } = useProjectDetail(isLogin, id!);

  const dueDate = data && data.data ? data.data?.due_date || "" : "";
  let dateDisplay = "";
  if (dueDate) dateDisplay = format(new Date(dueDate), "MMM do yyy");

  // let people: Partial<Employee[]> = [];
  // if (data) {
  //   people = data.data.people;
  // }

  const taskAmount = useMemo(() => {
    if (data && data.data && data.data.tasks) {
      let num: TAmount = data.data.tasks.length;
      if (num > 99) num = "99+";
      return num;
    }
    return "-";
  }, [data]);

  const taskSoonAmount = useMemo(() => {
    if (data && data.data && data.data.tasks) {
      let num: TAmount = data.data.tasks.filter(
        (i) => differenceInDays(new Date(), new Date(i?.due_date || "")) <= 3,
      ).length;
      if (num > 99) num = "99+";
      return num;
    }
    return "-";
  }, [data]);

  const color = useMemo(() => {
    if (data && data.data && data.data.color) {
      return data.data.color;
    }
    return "";
  }, [data]);

  const peopleList = useMemo(() => {
    if (data && data.data && data.data.people) {
      const list = Array.from(new Set(data.data.people.map((i) => i?.id)));
      return list.map((i) => data.data.people.find((j) => j?.id === i));
    }
    return [];
  }, [data]);

  const peopleAmount = useMemo(() => {
    if (peopleList.length > 0) {
      let num: TAmount = peopleList.length;
      if (num > 99) num = "99+";
      return num;
    }
    return "-";
  }, [peopleList]);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.7 },
        visible: { opacity: 1, scale: 1 },
      }}
      className="projectCardSummary"
      style={color ? { backgroundColor: color } : {}}
    >
      {isLoading ? (
        <div className="inner">
          <Loader className="size-8 animate-spin" />
        </div>
      ) : (
        <div className="inner">
          <div>
            <div className="title">{data && data.data.name}</div>
            <div className="statusRow">
              <div className="statusLabel">{data && data.data.status}</div>
              <div className="statusDuedate">
                <Calendar className="size-3" />
                {dateDisplay}
              </div>
            </div>
          </div>
          <div className="infoRow">
            <div className="boxInfo">
              <div className="flex">
                {peopleList.slice(0, 5).map((i, n) => (
                  <div
                    key={`${i?.id}-${n}`}
                    className="-ml-3 first:ml-0 aspect-square"
                  >
                    <EmployeeAvatar {...i} size="sm" />
                  </div>
                ))}
              </div>
              <div className="infoText">
                <span className="peopleNumber">{peopleAmount} People </span>
                <br />
                Joined
              </div>
            </div>
            <div className="boxInfo">
              <div className="statusNumber">{taskAmount}</div>
              <div className="infoText">Total Tasks</div>
            </div>
            <div className="boxInfo">
              <div className="statusNumber">{taskSoonAmount}</div>
              <div className="infoText">Tasks Due Soon</div>
            </div>
            <Link href={`/project/${id}`} className="boxInfo link">
              <div></div>
              <div>
                <ArrowUpRight className="size-10" />
                <div className="infoText">Detail</div>
              </div>
            </Link>
          </div>
        </div>
      )}
    </motion.div>
  );
}
