import cors from "@elysiajs/cors";
import { error } from "elysia";

export const corsConfig = cors({
  origin: ["http://localhost:3000", "http://103.127.139.85:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
});
