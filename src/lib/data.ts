import { TEmployee, TProject, TTask } from "./types";

export const projects: TProject[] = [
  { id: 1, name: "Website Redesign" },
  { id: 2, name: "Mobile App Development" },
  { id: 3, name: "Marketing Campaign" },
];

export const employees: TEmployee[] = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Bob Johnson" },
  { id: 4, name: "Alice Brown" },
];

export const tasks: TTask[] = [
  {
    id: 1,
    title: "Design new landing page",
    status: "In Progress",
    assignee: "John Doe",
    dueDate: "2023-06-30",
    projectId: 1,
  },
  {
    id: 2,
    title: "Implement user authentication",
    status: "Completed",
    assignee: "Jane Smith",
    dueDate: "2023-06-15",
    projectId: 2,
  },
  {
    id: 3,
    title: "Write API documentation",
    status: "Not Started",
    assignee: "Bob Johnson",
    dueDate: "2023-07-10",
    projectId: 2,
  },
  {
    id: 4,
    title: "Create social media content",
    status: "In Progress",
    assignee: "Alice Brown",
    dueDate: "2023-07-05",
    projectId: 3,
  },
];
