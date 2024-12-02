import {
  addDays,
  eachDayOfInterval,
  format,
  startOfDay,
  subDays,
} from "date-fns";
import { TaskRepo } from "../infrastructure/database/task.repo";
import { Task } from "../interfaces/entities";
import { HelperService } from "./helper.service";
import { v4 as uuid } from "uuid";

export class TaskService {
  private taskRepo: TaskRepo;
  private helperService = new HelperService();

  constructor(taskRepo: TaskRepo) {
    this.taskRepo = taskRepo;
  }

  async getByProject(projectId: string) {
    const result = await this.taskRepo.getByProject(projectId);
    return this.helperService.handleResponse(result);
  }

  async getByDoneDate(date: string, idOnly?: boolean) {
    const result = await this.taskRepo.getByDoneDate(date, idOnly);
    return this.helperService.handleResponse(result);
  }

  async create(data: Partial<Task>, token: string) {
    const result = await this.taskRepo.create(
      {
        status: "pending",
        id: uuid(),
        updated_at: new Date().toISOString(),
        ...data,
      },
      token
    );
    return this.helperService.handleResponse(result);
  }

  async update(id: string, data: Partial<Task>) {
    const result = await this.taskRepo.update(id, data);
    return this.helperService.handleResponse(result);
  }

  async delete(id: string) {
    const result = await this.taskRepo.delete(id);
    return this.helperService.handleResponse(result);
  }

  async getDueSoon(date: string = new Date().toISOString()) {
    const result = await this.taskRepo.getDueSoon(date);
    return this.helperService.handleResponse(result);
  }

  async getTaskProgress(targetDate = new Date().toISOString()) {
    const initial = format(
      startOfDay(new Date(targetDate)),
      "yyyy-MM-dd HH:mm:ss"
    );
    const before = subDays(initial, 4);
    const after = addDays(initial, 4);
    const all = eachDayOfInterval({ start: before, end: after });

    // return await this.taskRepo.getTaskByDate(targetDate);

    const allRequest = all.map(async (d) => {
      return await this.taskRepo.getTaskByDate(d.toISOString());
    });

    const promiseAll = await Promise.all(allRequest).then((res) => res);

    return this.helperService.handleResponse(promiseAll);
  }
}
