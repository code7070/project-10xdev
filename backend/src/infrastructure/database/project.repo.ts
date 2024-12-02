import { IProject, Project } from "../../interfaces/entities";
import supabase from "../supabase";

export class ProjectRepo implements IProject {
  private tableName = "project";
  private tableUser = "USER";
  private tableTask = "task";

  private supabase = supabase();

  // async get(id?: string) {
  //   const api = this.supabase
  //     .from(this.tableName)
  //     .select("id,name,description,due_date");
  //   const res = id
  //     ? await api.eq("id", id).single()
  //     : await api.order("created_at", { ascending: false });
  //   if (res.error) return res.error;
  //   return res.data;
  // }
  //
  async get(token: string) {
    const user = await this.supabase
      .from(this.tableUser)
      .select("id")
      .eq("token", token)
      .single();
    if (user.data) {
      const api = await this.supabase
        .from(this.tableName)
        .select("id")
        .eq("created_by", user.data.id)
        .order("created_at", { ascending: false });
      if (api.error) return api.error;
      return api.data.map((i) => i.id);
    }
    return user.error;
  }

  async getDetail(id: string, token: string) {
    const user = await this.supabase
      .from(this.tableUser)
      .select("id")
      .eq("token", token)
      .single();
    if (user.data) {
      const project = await this.supabase
        .from(this.tableName)
        .select("id,name,description,due_date,status,color")
        .eq("id", id)
        .eq("created_by", user.data.id)
        .single();
      if (project.data) {
        const tasks = await this.supabase
          .from(this.tableTask)
          .select("id,name,due_date,status,people:employee_id(id,name,photo)")
          .eq("project_id", project.data.id)
          .order("due_date", { ascending: false });
        if (tasks.error) return tasks.error;
        return {
          ...project.data,
          tasks: tasks.data.map((i) => ({ ...i, people: i.people })),
          people: tasks.data
            .map((i) => i.people)
            .flat()
            .map((i) => i),
        };
      }
      return project.error;
    }
    return user.error;
  }

  async create(data: Partial<Project>, token: string) {
    const user = await this.supabase
      .from(this.tableUser)
      .select("id")
      .eq("token", token)
      .single();
    if (user && user.data) {
      const res = await this.supabase
        .from(this.tableName)
        .insert({ ...data, created_by: user.data.id })
        .select("id")
        .single();
      if (res.error) return res.error;
      return res.data.id;
    }
    return user.error;
  }

  async update(id: string, data: Partial<Project>) {
    const res = await this.supabase
      .from(this.tableName)
      .update(data)
      .eq("id", id)
      .select("id")
      .single();
    if (res.error) return res.error;
    return res.data.id;
  }

  async delete(id: string) {
    return await this.update(id, { deleted_at: new Date().toISOString() });
  }

  async getActive() {
    const res = await this.supabase
      .from(this.tableName)
      .select("id")
      .eq("status", "ACTIVE")
      .order("due_date", { ascending: false });
    if (res.error) return res.error;
    return res.data.map((i) => i.id);
  }
}
