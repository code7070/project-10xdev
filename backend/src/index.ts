import { Elysia, error } from "elysia";
import { appRoutes } from "./routes";
import { corsConfig } from "./tools";

export const PORT = process.env.PORT || 3000;

const app = new Elysia()
  // Hooks
  // Routes
  .use(corsConfig)
  .get("/test", () => "ok")
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
  .use(appRoutes)

  // Activation
  .listen({ port: PORT, idleTimeout: 120 });

export const apiApp = app;

console.log(
  `👻 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);
