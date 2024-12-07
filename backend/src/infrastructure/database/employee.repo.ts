import { SupabaseClient } from "@supabase/supabase-js";
import { Employee, IEmployee, RandomUser } from "../../interfaces/entities";
import { RandomUserService } from "../../application/random-user.service";

export class EmployeeRepo implements IEmployee {
  private tableName = "employee";
  private supabase: SupabaseClient;
  private randomUserService: RandomUserService;

  constructor(supabase: SupabaseClient, randomUserService: RandomUserService) {
    this.supabase = supabase;
    this.randomUserService = randomUserService;
  }

  async addEmployee(amount?: number) {
    const endpoint = `https://randomuser.me/api?results=${
      amount || 1
    }&inc=login,name,picture,email`;
    const users = await this.randomUserService.get(1);
    const payload: Employee[] = users.results?.map((i) => ({
      id: i.login.uuid,
      name: `${i.name.first} ${i.name.last}`,
      email: i.email,
      photo: i.picture.large,
    }));
    const { data, error } = await this.supabase
      .from(this.tableName)
      .insert(payload)
      .select("id,name,photo,email");
    if (error) return error;
    return data;
  }

  async getEmployee(id?: string) {
    const base = this.supabase
      .from(this.tableName)
      .select("id,name,photo,email");
    const data = id
      ? await base.eq("id", id)
      : await base.order("created_at", { ascending: false });
    return data.error ? data.error : data.data;
  }

  async getAll() {
    const base = await this.supabase
      .from(this.tableName)
      .select("id,name,photo")
      .order("name", { ascending: false });
    if (base.error) return base.error;
    return base.data;
  }
}
