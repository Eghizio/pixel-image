import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import * as rotatingFileStream from "rotating-file-stream";
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

  const isDevelopment = environment === "development";

  app.use(
    morgan(isDevelopment ? "dev" : "combined", {
      stream: isDevelopment
        ? undefined
        : rotatingFileStream.createStream(
            (time) => {
              if (!time) return `${new Date().toISOString()}.log`;
              if (typeof time === "number") return `${time}.log`;
              return `${time.toISOString()}.log`;
            },
            {
              interval: "1d",
              path: "logs",
              compress: "gzip",
              teeToStdout: true,
            }
          ),
    })
  );
  app.use(
    cors({
      origin: (origin, callback) => {
        console.log({ origin }); // Debug

        if (!origin) return callback(null, false);

        const allowList = [
          isDevelopment
            ? "http://localhost:5173"
            : "https://frog02-40476.wykr.es",
          "https://pixel-image-client.vercel.app",
        ];

        return callback(null, allowList.includes(origin));
      },
      credentials: true,
      optionsSuccessStatus: 200,
    })
  );
  app.use(express.json());
  app.use(cookieParser(secrets.cookies));
  app.disable("x-powered-by");

  if (isDevelopment) app.set("json spaces", 2);

  app.get("/_/health", (_, res) => {
    res.json({ health: "ok", environment });
  });

  app.use(createPublicRouter());
  app.use(createOldApiRouter(Modules));
  app.use("/api", createApiRouter(Modules));

  return app;
};
