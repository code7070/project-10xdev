import { EmployeeService } from "../../application/employee.service";
import { HelperService } from "../../application/helper.service";
import { ProjectService } from "../../application/project.service";
import { TaskService } from "../../application/task.service";
import { UserService } from "../../application/user.service";
import { EmployeeRepo } from "../database/employee.repo";
import { AIService } from "../../application/ai.service";
import { ProjectRepo } from "../database/project.repo";
import { TaskRepo } from "../database/task.repo";
import { UserRepo } from "../database/user.repo";

const helperService = new HelperService();

const userRepo = new UserRepo();
export const userService = new UserService(userRepo, helperService);

const employeeRepo = new EmployeeRepo();
export const employeeService = new EmployeeService(employeeRepo);

const projectRepo = new ProjectRepo();
export const projectService = new ProjectService(projectRepo, helperService);

const taskRepo = new TaskRepo();
export const taskService = new TaskService(taskRepo);

export const aiService = new AIService();
