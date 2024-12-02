import { Elysia, t } from "elysia";
import { aiService, projectService } from "../infrastructure/ioc/container";

export const projectRoutes = new Elysia({ prefix: "/project" })
  // routes
  .get("/test", () => "ok")
  .get("/", async ({ cookie: { "pms-token": token } }) => {
    return await projectService.get(token.value!);
  })
  .get(
    "/detail/:projectId",
    async ({ params: { projectId }, cookie: { "pms-token": token } }) => {
      return await projectService.getDetail(projectId, token.value!);
    },
  )
  .post(
    "/",
    async ({ body }) => {
      return await projectService.create(body);
    },
    {
      body: t.Object({
        name: t.String(),
        description: t.String(),
        due_date: t.String(),
        updated_at: t.Optional(t.String()),
        updated_by: t.Optional(t.String()),
      }),
    },
  )
  .get("/active", async () => {
    return await projectService.getActive();
  })
  .get(
    "/generate-ai",
    async ({ query }) => {
      return await aiService.project().description(query.projectName);
    },
    { query: t.Object({ projectName: t.String() }) },
  );
