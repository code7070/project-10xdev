import { error } from "elysia";
import { ProjectRepo } from "../infrastructure/database/project.repo";
import { Project } from "../interfaces/entities";
import { HelperService } from "./helper.service";
import { v4 as uuid } from "uuid";

export class ProjectService {
  private projectRepo: ProjectRepo;
  private helperService: HelperService;

  constructor(projectRepo: ProjectRepo, helperService: HelperService) {
    this.projectRepo = projectRepo;
    this.helperService = helperService;
  }

  async get(token: string) {
    if (!token) return error(401, { message: "Unauthorized" });
    const result = await this.projectRepo.get(token);
    return this.helperService.handleResponse(result);
  }

  async getDetail(id: string, token: string) {
    if (!token) return error(401, { message: "Unauthorized" });
    const result = await this.projectRepo.getDetail(id, token);
    return this.helperService.handleResponse(result);
  }

  async create(data: Partial<Project>, token: string) {
    const colors = [
      "#89221F",
      "#FE6948",
      "#4B8FA1",
      "#40769E",
      "#355D9A",
      "#C44634",
    ];
    const random = colors[Math.floor(Math.random() * colors.length)];
    const result = await this.projectRepo.create(
      {
        id: uuid(),
        color: random,
        status: "ACTIVE",
        ...data,
      },
      token,
    );
    return this.helperService.handleResponse(result);
  }

  async getActive() {
    const result = await this.projectRepo.getActive();
    return this.helperService.handleResponse(result);
  }
}
