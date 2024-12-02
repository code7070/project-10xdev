import Elysia, { t } from "elysia";
import { employeeService } from "../infrastructure/ioc/container";

export const employeeRoutes = new Elysia({ prefix: "/employee" })
  // routes
  .get("/test", () => "ok")
  .get(
    "/add",
    async ({ query }) => {
      return await employeeService.addEmployee(query.amount);
    },
    {
      query: t.Object({
        amount: t.Number(),
      }),
    }
  )
  .get(
    "/",
    async ({ query }) => {
      return await employeeService.getEmployee(query.id);
    },
    {
      query: t.Optional(
        t.Object({
          id: t.String(),
        })
      ),
    }
  )
  .get("/get-all", async () => {
    return await employeeService.getAllEmployee();
  });
