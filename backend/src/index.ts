import { Elysia, error } from "elysia";
import { cors } from "@elysiajs/cors";
import { userRoutes } from "./presentation/user.routes";
import { employeeRoutes } from "./presentation/employee.routes";
import { projectRoutes } from "./presentation/project.routes";
import { taskRoutes } from "./presentation/task.routes";

export const PORT = process.env.PORT || 3000;

const app = new Elysia()
  // Hooks
  // Routes
  .use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    }),
  )
  .guard({
    beforeHandle({ headers }) {
      const headers_apiId = headers?.["api-id"] || "";
      const headers_apiKey = headers?.["api-key"] || "";
      const env_apiId = process.env.API_ID;
      const env_apiKey = process.env.API_KEY;

      if (headers_apiId !== env_apiId && headers_apiKey !== env_apiKey)
        return error(420, { message: "Invalid connection" });
    },
  })
  // add check for request headers api-key api-id
  .get("/test", () => "ok")
  .use(userRoutes)
  .use(employeeRoutes)
  .use(projectRoutes)
  .use(taskRoutes)
  // Activation
  .listen({ port: PORT, idleTimeout: 120 });

console.log(
  `👻 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);
