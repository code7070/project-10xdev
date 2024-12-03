import { addHours, eachDayOfInterval, subDays } from "date-fns";
import { FetchService } from "./fetcher";
import { dummyProjects } from "./dummy.dashboard";

export class DashboardService {
  constructor() {}

  private fetch = new FetchService();

  dummyMeetingList() {
    return [
      {
        name: "Weekly Meeting MHS Project",
        date: addHours(new Date(), 3),
        link: "https://meet.google.com",
        details: "#",
      },
    ];
  }

  dummyProjectList() {
    return dummyProjects.map((i) => i);
  }

  dummyOverdueTasks() {
    const projects = this.dummyProjectList();
    const tasks = [...projects.map((i) => i.tasks).flat()];
    return tasks.filter((i) => new Date(i?.due_date || "") >= new Date());
  }

  dummyProjectsCount() {
    return this.dummyProjectList().length;
  }

  findProjectNameById(id: string) {
    const projects = this.dummyProjectList();
    return projects.find((i) => i.id === id)?.name || "";
  }

  getRangeDate(start = subDays(new Date(), 8), end = new Date()) {
    return eachDayOfInterval({ start, end });
  }

  dummyProfile() {
    return {
      name: "John Doe",
      photo: "https://placehold.co/300/#FF8E75",
    };
  }
}
