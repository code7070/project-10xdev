import { Elysia, t } from "elysia";
import { taskService } from "../infrastructure/ioc/container";
import { Task } from "../interfaces/entities";

export const taskRoutes = new Elysia({ prefix: "/task" })
  // routes
  .get("/test", () => "ok")
  .get("/project/:projectId", async ({ params }) => {
    return await taskService.getByProject(params.projectId);
  })
  .get("/done/:date", async ({ params }) => {
    return await taskService.getByDoneDate(params.date);
  })
  .post(
    "/create",
    async ({ body, cookie: { "pms-token": token } }) => {
      return await taskService.create(body, token.value!);
    },
    {
      body: t.Object({
        name: t.String(),
        due_date: t.String(),
        employee_id: t.String(),
        project_id: t.String(),
      }),
    }
  )
  .post(
    "/update/:taskId",
    async ({ params, body }) => {
      const payload = body as Task;
      return await taskService.update(params.taskId, payload);
    },
    {
      body: t.Object({
        done_at: t.Optional(t.String()),
        status: t.Optional(t.String()),
        name: t.Optional(t.String()),
        project_id: t.Optional(t.String()),
        employee_id: t.Optional(t.String()),
      }),
    }
  )
  .post("/delete/:taskId", async ({ params }) => {
    return await taskService.delete(params.taskId);
  })
  .get(
    "/due-soon",
    async ({ query }) => {
      return await taskService.getDueSoon(query.date);
    },
    {
      query: t.Object({
        date: t.Optional(t.String()),
      }),
    }
  )
  .get("/progress/:date", async ({ params }) => {
    return await taskService.getTaskProgress(params.date);
  });
