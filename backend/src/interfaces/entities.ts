import { PostgrestError } from "@supabase/supabase-js";

export interface User {
  id?: number;
  name?: string;
  photo?: string;
  token?: string;
  token_expires?: Date | string;
  last_login?: Date | string;
}

export interface IUser {
  getByToken: (token: string) => Promise<User | PostgrestError>;
  create: (
    name: string,
    password: string,
    photo: string,
  ) => Promise<User | PostgrestError>;
  update: (id: number, data: Partial<User>) => Promise<User | PostgrestError>;
  login: (
    name: string,
    password: string,
  ) => Promise<Partial<User> | PostgrestError>;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  due_date?: string;
  created_at?: string;
  created_by?: string;
  updated_at?: string;
  updated_by?: string;
  deleted_at?: string;
  status?: "ACTIVE" | "DONE" | "CANCELED" | "PENDING";
  color?: string;
}

export interface IProject {
  get: (token: string) => Promise<string[] | PostgrestError>;
  getDetail: (
    id: string,
    token: string,
  ) => Promise<ProjectDetail | PostgrestError>;
  create: (
    data: Partial<Project>,
    token: string,
  ) => Promise<string[] | string | PostgrestError>;
  update: (
    id: string,
    data: Partial<Project>,
    token: string,
  ) => Promise<Partial<Project[]> | PostgrestError>;
  delete: (id: string, date: string, token: string) => Promise<void | string>;
  getActive: () => Promise<Partial<Task[]> | PostgrestError>;
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
  people?: Partial<Employee | Employee[]>;
}

interface TaskProgress {
  date: string;
  data: Partial<Task[]>;
  done: Partial<Task[]>;
}

export interface ITask {
  getByProject: (
    projectId: string,
  ) => Promise<Partial<Task[]> | PostgrestError>;
  getByDoneDate: (
    date: string,
    idOnly?: boolean,
  ) => Promise<Partial<Task[]> | PostgrestError>;
  create?: (
    data: Partial<Task>,
    token: string,
  ) => Promise<string | PostgrestError>;
  update?: (
    id: string,
    data: Partial<Task>,
  ) => Promise<Partial<Task> | PostgrestError>;
  delete?: (id: string) => Promise<string | void>;
  getDueSoon?: (date: string) => Promise<Partial<Task[]> | PostgrestError>;
  getDetail?: (id: string) => Promise<Partial<Task> | PostgrestError>;
  getTaskByDate?: (date: string) => Promise<TaskProgress | PostgrestError>;
}

export interface Employee {
  id: string;
  name: string;
  photo: string;
  email?: string;
}

export interface IEmployee {
  getEmployee: (id?: string) => Promise<Employee[] | PostgrestError>;
  addEmployee: (amount?: number) => Promise<Employee[] | PostgrestError>;
}

// 3rd services
export interface RandomUser {
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  login: {
    uuid: string;
    [key: string]: string | number;
  };
  picture: {
    large: string;
    [key: string]: string;
  };
}

export interface ProjectDetail extends Project {
  tasks: Partial<Task[]>;
  people: Partial<Employee[]>;
}

export interface ServiceResponse<T> {
  status: number;
  data: T;
}
