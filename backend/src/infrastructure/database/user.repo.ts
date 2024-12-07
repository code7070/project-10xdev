import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import { IUser, User } from "../../interfaces/entities";
import { addDays } from "date-fns";
import { v4 as uuid } from "uuid";

export class UserRepo implements IUser {
  private tableName = "USER";
  private supabase: SupabaseClient;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  async getByToken(token: string): Promise<User | PostgrestError> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select("id,name,photo")
      .eq("token", token)
      .gte("token_expires", new Date().toISOString())
      .single();
    if (error) return error;
    return data;
  }

  async create(name: string, password: string, photo: string) {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .insert({ name, password, photo })
      .select("id")
      .single();
    if (error) return error;
    return data;
  }

  async update(
    id: number,
    payload: Partial<User>,
  ): Promise<Partial<User> | PostgrestError> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .update(payload)
      .eq("id", id)
      .select("token")
      .single();
    if (error) return error;
    return data;
  }

  async login(name: string, password: string) {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select("id")
      .eq("name", name)
      .eq("password", password)
      .single();

    if (error) return error;

    const token = uuid();
    const token_expires = addDays(new Date(), 1).toISOString();
    const last_login = new Date().toISOString();
    const updated = await this.update(data.id, {
      token,
      token_expires,
      last_login,
    });
    return { ...updated, token_expires };
  }
}
