import { SupabaseClient } from "@supabase/supabase-js";
import { ITask, Task } from "../../interfaces/entities";
import { addDays, format } from "date-fns";

export class TaskRepo implements ITask {
  private tableName = "task";
  private tableUser = "USER";
  private supabase: SupabaseClient;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  async getDetail(id: string) {
    const select =
      "id,name,status,due_date,employee:employee_id(name,id),project:project_id(name,id),created_at,updated_at,updated_by,employee_id,done_at,deleted_at";
    const api = await this.supabase
      .from(this.tableName)
      .select(select)
      .eq("id", id)
      .single();
    if (api.error) return api.error;
    return {
      ...api.data,
      employee: api.data.employee?.[0],
      project: api.data.project?.[0],
    };
  }

  async getByProject(projectId: string) {
    const api = await this.supabase
      .from(this.tableName)
      .select("id,name,status,due_date,employee:employee_id(name,id)")
      .eq("project_id", projectId);
    if (api.error) return api.error;
    return api.data.map((i) => ({ ...i, employee: i.employee?.[0] }) as Task);
  }

  async getByDoneDate(date: string, idOnly?: boolean) {
    let select = "id,name,status,due_date,employee(name,id)";
    if (idOnly) select = "id";
    const api = await this.supabase
      .from(this.tableName)
      .select(select, { count: "exact" })
      .eq("done_at", date);
    if (api.error) return api.error;
    return api.data.map((task: any) => ({
      ...task,
      employee: task.employee?.[0] || null,
    }));
  }

  async create(data: Partial<Task>, token: string) {
    const user = await this.supabase
      .from(this.tableUser)
      .select("id")
      .eq("token", token)
      .single();
    if (user.data) {
      const api = await this.supabase
        .from(this.tableName)
        .insert({ ...data, updated_by: user.data.id })
        .select("id")
        .single();
      if (api.error) return api.error;
      return api.data.id;
    }
    return user.error;
  }

  async update(id: string, data: Partial<Task>) {
    const api = await this.supabase
      .from(this.tableName)
      .update(data)
      .eq("id", id)
      .select("id")
      .single();
    if (api.error) return api.error;
    return api.data.id;
  }

  async delete(id: string) {
    return await this.update(id, { deleted_at: new Date().toISOString() });
  }

  async getDueSoon(date: string) {
    const res = await this.supabase
      .from(this.tableName)
      .select("id")
      .gte("due_date", new Date(date).toISOString())
      .lte("due_date", addDays(new Date(date), 3).toISOString())
      .order("due_date", { ascending: false });
    if (res.error) return res.error;
    return res.data.map((item: any) => item.id);
  }

  async getTaskByDate(date: string) {
    const res = await this.supabase
      .from(this.tableName)
      .select("id,done_at")
      .eq("due_date", format(new Date(date), "yyyy-MM-dd"));
    if (res.error) return res.error;
    return {
      date,
      data: res.data.map((item) => item.id),
      done: res.data
        .filter((i) => i.done_at && new Date(i.done_at) <= new Date())
        ?.map((i) => i.id),
    };
  }
}
