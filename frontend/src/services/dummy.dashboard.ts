import { Project, Task } from "@/types";
import { addDays, addHours, subDays } from "date-fns";

interface Item extends Project {
  tasks?: Task[];
}

const dummyProjects: Item[] = [
  {
    id: "abc",
    name: "Project 1",
    due_date: addHours(new Date(), 3).toString(),
    status: "ACTIVE",
    tasks: [
      {
        id: "abc-1",
        name: "Task 1",
        due_date: addDays(new Date(), 1).toISOString(),
        status: "in-progress",
        project_id: "abc",
        project: {},
        employee: {},
      },
      {
        id: "abc-2",
        name: "Developing Dashboard for PaMeet UI",
        due_date: addDays(new Date(), 2).toISOString(),
        status: "in-progress",
        project_id: "abc",
        project: {},
        employee: {},
      },
      {
        id: "abc-3",
        name: "Plug Google Analytic",
        due_date: subDays(new Date(), 1).toISOString(),
        status: "in-progress",
        project_id: "abc",
        project: {},
        employee: {},
      },
      {
        id: "abc-4",
        name: "Task 4",
        due_date: subDays(new Date(), 4).toISOString(),
        status: "in-progress",
        project_id: "abc",
        project: {},
        employee: {},
      },
      {
        id: "abc-5",
        name: "Task 5",
        due_date: subDays(new Date(), 5).toISOString(),
        status: "in-progress",
        project_id: "abc",
        project: {},
        employee: {},
      },
      {
        id: "abc-6",
        name: "Task 6",
        due_date: subDays(new Date(), 6).toISOString(),
        status: "in-progress",
        project_id: "abc",
        project: {},
        employee: {},
      },
      {
        id: "abc-7",
        name: "Task 7",
        due_date: subDays(new Date(), 7).toISOString(),
        status: "in-progress",
        project_id: "abc",
        project: {},
        employee: {},
      },
    ],
  },
];

export { dummyProjects };
