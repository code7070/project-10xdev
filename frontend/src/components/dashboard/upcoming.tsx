import { DashboardService } from "@/services/dashboard.service";
import BrandArrow from "../brand-arrow";
import Link from "next/link";
import { ArrowUpRight, Video } from "lucide-react";
import { format } from "date-fns";

const dashboard = new DashboardService();

export default function DashboardUpcoming() {
  const meeting = dashboard.dummyMeetingList();

  return (
    <div
      className="relative size-full rounded-app-radius bg-app-green text-white py-8 px-6 flex flex-col gap-4"
      style={{
        backgroundImage: "url(/pattern-green-box.png)",
        backgroundPosition: "bottom left",
        backgroundSize: "contain",
      }}
    >
      <div className="w-full flex justify-between">
        <div className="flex-1">
          <div className="text-[28px] font-semibold font-secondary">
            Upcoming Meeting
          </div>
          <div className="font-medium text-sm">In 3 hours</div>
        </div>
        <BrandArrow arrowColor="#2C838C" circleColor="#fff" size="lg" />
      </div>
      <div>
        {meeting.map((i, n) => (
          <div
            key={n}
            className="bg-white/10 border border-transparent rounded-app-radius py-3 px-4 flex gap-2.5 hover:bg-white/20 hover:border-white"
          >
            <div className="flex-1">
              <div className="font-secondary line-clamp-2">{i.name}</div>
              <div className="text-xs">
                {format(i.date, "EE, MMM do yyyy - h.mm a")}
              </div>
            </div>
            <div className="flex flex-col gap-1 w-20 text-xs font-medium">
              <Link
                href={i.link}
                className="flex w-full justify-between gap-2 items-center bg-app-yellow text-stone-800 text-xs rounded-full py-1 px-2"
              >
                <div className="flex-1">Join</div>
                <Video className="size-3" />
              </Link>
              <Link
                href={i.details}
                className="flex w-full justify-between gap-2 items-center bg-white text-stone-800 text-xs rounded-full py-1 px-2"
              >
                <div className="flex-1">Details</div>
                <ArrowUpRight className="size-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
