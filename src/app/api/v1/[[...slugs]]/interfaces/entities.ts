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
    photo: string
  ) => Promise<User | PostgrestError>;
  update: (id: number, data: Partial<User>) => Promise<User | PostgrestError>;
  login: (
    name: string,
    password: string
  ) => Promise<Partial<User> | PostgrestError>;
}
