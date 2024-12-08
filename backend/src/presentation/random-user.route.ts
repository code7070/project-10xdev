import { Elysia, t } from "elysia";
import { randomUserService } from "../infrastructure/ioc/container";

export const randomUserRoutes = new Elysia({ prefix: "/random-user" })
  // routes
  .get(
    "/",
    async ({ query: { amount } }) => {
      return await randomUserService.get(amount || 1);
    },
    {
      query: t.Object({
        amount: t.Optional(t.Number()),
      }),
    },
  )
  .get("/test", () => "ok");
