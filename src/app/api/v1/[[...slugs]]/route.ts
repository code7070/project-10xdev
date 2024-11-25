import { Elysia } from "elysia";
import { userRoutes } from "./presentation/user.routes";

const app = new Elysia({ prefix: "/api/v1" })
  // routes
  .get("/", () => "Hello App!")
  .use(userRoutes);

export const GET = app.handle;
export const POST = app.handle;
