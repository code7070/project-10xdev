import { KeyedMutator } from "swr";

interface User {
  name?: string;
  photo?: string;
  id?: number;
}

export interface IResponse<T> {
  status: number;
  data: T;
}

export type mutateUserData = KeyedMutator<User>;

export interface IUseAuth {
  isLoading: boolean;
  data: Partial<User>;
  mutate: mutateUserData;
}

export interface IContextUserData extends User {
  isLoading: boolean;
  mutate: mutateUserData;
}

export interface Project {
  id: string;
  name?: string;
  description?: string;
  due_date?: string;
  created_at?: string;
  updated_at?: string;
  updated_by?: string;
  deleted_at?: string;
  status?: "ACTIVE" | "DONE" | "CANCELED";
  color?: string;
}

export interface Task {
  id: string;
  name: string;
  status: "pending" | "in-progress" | "done";
  due_date: string;
  project_id?: string;
  project?: Partial<Project>;
  created_at?: string;
  updated_at?: string;
  updated_by?: string;
  employee_id?: string;
  employee?: Partial<Employee>;
  done_at?: string;
  deleted_at?: string;
  people?: Partial<Employee>;
}

export interface Employee {
  id: string;
  name: string;
  photo: string;
  email?: string;
}

export interface TaskProgress {
  date: string;
  data: Partial<Task[]>;
  done: Partial<Task[]>;
}

export interface ProjectDetail extends Project {
  tasks: Partial<Task[]>;
  people: Partial<Employee[]>;
}

export interface ApiResponse<T> {
  status: number;
  data: T;
}
