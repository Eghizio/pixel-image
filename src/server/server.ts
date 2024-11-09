import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import type { Config } from "../Config.js";
import type { ApplicationModules } from "src/modules/index.js";
import { createApiRouter } from "./router/api.js";
import { createPublicRouter } from "./router/public.js";
import { createOldApiRouter } from "./router/old_api.js";

export const createServer = (
  { environment, secrets }: Config,
  Modules: ApplicationModules
) => {
  const app = express();

  app.use(morgan("dev"));
  app.use(express.json());
  app.use(cookieParser(secrets.cookies));
  app.disable("x-powered-by");

  if (environment === "development") app.set("json spaces", 2);

  app.get("/_/health", (_, res) => {
    res.json({ health: "ok", environment });
  });

  app.use(createPublicRouter());
  app.use(createOldApiRouter(Modules));
  app.use("/api", createApiRouter(Modules));

  return app;
};
