import { TaskList } from "@/components/dashboard/task-list";
import { DashboardOverview } from "@/components/dashboard/overview";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Bot } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Bot className="size-8" /> Pawang Meeting
        </h1>
        <Button variant="outline" asChild>
          <Link href="/employee">Manage Employee</Link>
        </Button>
      </div>
      <DashboardOverview />
      <TaskList />
    </div>
  );
}
