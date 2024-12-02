import { Elysia, t } from "elysia";
import { userService } from "../infrastructure/ioc/container";

export const userRoutes = new Elysia({ prefix: "/user" })
  // routes
  .get("/test", () => "ok")
  .post(
    // create user
    "/",
    async (context) => {
      const { name, password } = context.body;
      const res = await userService.create(name, password);
      return res;
    },
    { body: t.Object({ name: t.String(), password: t.String() }) },
  )
  .post(
    // get user by token
    "/get",
    async ({ cookie }) => {
      const token = cookie["pms-token"] || "";
      const res = await userService.getByToken(token.value!);
      if (res.status !== 200) token.value = "";
      return res;
    },
  )
  .post(
    // login user
    "/login",
    async ({ body, cookie: { "pms-token": token } }) => {
      const { name, password } = body;
      const res = await userService.login(name, password);
      return res;
    },
    {
      body: t.Object({
        name: t.String(),
        password: t.String(),
      }),
    },
  );
