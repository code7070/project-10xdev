import { format } from "date-fns";
import { Calendar } from "lucide-react";

interface GreetingProps {
  name: string;
}

export default function DashboardGreeting({ name = "Ganteng" }: GreetingProps) {
  const now = new Date();
  const displayDate = format(now, "EEEE, MMMM do yyyy");

  const displayName = name.split(" ")[0];

  const currentHour = now.getHours();
  let greeting = "Good Morning";
  if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good Afternoon";
  } else if (currentHour >= 18 && currentHour < 20) {
    greeting = "Good Evening";
  } else if (currentHour >= 20) {
    greeting = "Good Night";
  }

  return (
    <section className="w-full flex flex-col gap-2 items-center">
      <div className="text-gray-600 flex gap-2 items-center text-sm">
        <Calendar className="size-4" />
        <div>{displayDate}</div>
      </div>
      <div className="font-secondary text-3xl font-semibold capitalize">
        {greeting}, {displayName}!
      </div>
    </section>
  );
}
