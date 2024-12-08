import { Elysia } from "elysia";
import { userRoutes } from "./presentation/user.routes";
import { employeeRoutes } from "./presentation/employee.routes";
import { projectRoutes } from "./presentation/project.routes";
import { taskRoutes } from "./presentation/task.routes";
import { randomUserRoutes } from "./presentation/random-user.route";

export const appRoutes = new Elysia()
  // routing
  .use(userRoutes)
  .use(employeeRoutes)
  .use(projectRoutes)
  .use(taskRoutes)
  .use(randomUserRoutes);
