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
import { Supabase } from "../supabase";
import { RandomUserService } from "../../application/random-user.service";
import { RandomUserRepo } from "../database/random-user.repo";

const supabase = Supabase;

const helperService = new HelperService();

const randomUserRepo = new RandomUserRepo();
export const randomUserService = new RandomUserService(randomUserRepo);

const userRepo = new UserRepo(supabase);
export const userService = new UserService(userRepo, helperService);

const employeeRepo = new EmployeeRepo(supabase, randomUserService);
export const employeeService = new EmployeeService(employeeRepo);

const projectRepo = new ProjectRepo(supabase);
export const projectService = new ProjectService(projectRepo, helperService);

const taskRepo = new TaskRepo(supabase);
export const taskService = new TaskService(taskRepo);

export const aiService = new AIService();
