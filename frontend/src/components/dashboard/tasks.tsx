"use client";

import { useTaskSoon } from "@/services/useDashboardService";
import BrandArrow from "../brand-arrow";
import OrnamentCircum from "../ornament-circum";
import { Loader } from "lucide-react";

export default function DashboardTasks({
  isLogin = false,
}: {
  isLogin?: boolean;
}) {
  const { data, isLoading } = useTaskSoon(isLogin);
  return (
    <div className="relative size-full rounded-app-radius bg-white text-black py-8 px-6 flex flex-col gap-4 justify-between">
      <div className="w-full flex justify-between">
        <div className="text-[24px] font-semibold font-secondary">Tasks</div>
        {isLoading ? (
          <Loader className="size-10 animate-spin" />
        ) : (
          <BrandArrow arrowColor="#fff" circleColor="#000" size="md" />
        )}
      </div>
      <div>
        <div className="font-semibold font-secondary text-5xl">
          {data && typeof data === "object" ? data.length : "-"}
        </div>
        <div className="text-sm text-app-orange">Due soon</div>
      </div>
      <div className="absolute bottom-0 right-0 p-2">
        <OrnamentCircum />
      </div>
    </div>
  );
}
