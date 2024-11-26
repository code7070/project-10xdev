import { addDays, addHours, eachDayOfInterval, subDays } from "date-fns";
import { FetchService } from "./fetcher";

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
    return [
      {
        id: 1,
        name: "Project 1",
        dueDate: addHours(new Date(), 3),
        tasks: [
          {
            id: 1,
            name: "Slicing Main Dashboard for PaMeet UI",
            dueDate: addDays(new Date(), 1),
            status: "due",
            projectId: 1,
          },
          {
            id: 2,
            name: "Developing Dashboard for PaMeet UI",
            dueDate: addDays(new Date(), 2),
            status: "due",
            projectId: 1,
          },
          {
            id: 3,
            name: "Task 3",
            dueDate: subDays(new Date(), 3),
            status: "due",
            projectId: 1,
          },
          {
            id: 4,
            name: "Task 4",
            dueDate: subDays(new Date(), 4),
            status: "due",
            projectId: 1,
          },
          {
            id: 5,
            name: "Task 5",
            dueDate: subDays(new Date(), 5),
            status: "due",
            projectId: 1,
          },
          {
            id: 6,
            name: "Task 6",
            dueDate: subDays(new Date(), 6),
            status: "due",
            projectId: 1,
          },
          {
            id: 7,
            name: "Task 7",
            dueDate: subDays(new Date(), 7),
            status: "due",
            projectId: 1,
          },
        ],
      },
      {
        id: 2,
        name: "Project 2",
        dueDate: addHours(new Date(), 4),
        tasks: [
          {
            id: 8,
            name: "Tangkap Pokemon Air dengan Squirtle",
            dueDate: addDays(new Date(), 2),
            status: "due",
            projectId: 2,
          },
          {
            id: 9,
            name: "Task 2",
            dueDate: subDays(new Date(), 2),
            status: "due",
            projectId: 2,
          },
          {
            id: 10,
            name: "Task 3",
            dueDate: subDays(new Date(), 3),
            status: "due",
            projectId: 2,
          },
          {
            id: 11,
            name: "Task 4",
            dueDate: subDays(new Date(), 4),
            status: "due",
            projectId: 2,
          },
          {
            id: 12,
            name: "Task 5",
            dueDate: subDays(new Date(), 5),
            status: "due",
            projectId: 2,
          },
          {
            id: 13,
            name: "Task 6",
            dueDate: subDays(new Date(), 6),
            status: "due",
            projectId: 2,
          },
          {
            id: 14,
            name: "Task 7",
            dueDate: subDays(new Date(), 7),
            status: "due",
            projectId: 2,
          },
        ],
      },
    ];
  }

  dummyOverdueTasks() {
    const projects = this.dummyProjectList();
    const tasks = projects.flatMap((i) => i.tasks);
    return tasks.filter((i) => i.dueDate > new Date());
  }

  dummyTasksCount() {
    const projects = this.dummyProjectList();
    const tasks = projects.flatMap((i) => i.tasks);
    return tasks.length;
  }

  dummyProjectsCount() {
    return this.dummyProjectList().length;
  }

  findProjectNameById(id: number | string): string {
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
