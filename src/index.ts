import fs from "node:fs";
import { join } from "node:path";
import express, { RequestHandler } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { config } from "./Config.js";
import { modules } from "./modules/index.js";
import { databaseClient } from "./infrastructure/database/clients/index.js";

const { environment, port } = config;
const PIXEL_PATH = "./src/pixel.png";

const app = express();
const tracking = new Map();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser(config.secrets.cookies));
app.use(express.static(join("src", "public")));
app.disable("x-powered-by");

if (environment === "development") app.set("json spaces", 2);

app.get("/_/health", (_, res) => {
  res.json({ health: "ok", environment });
});

app.get("/_/tracking", (_, res) => {
  res.json({ entries: Object.fromEntries(tracking.entries()) });
});

app.get("/tracking", (req, res) => {
  const id = req.query.id;
  id ? res.json({ entries: tracking.get(id) ?? 0 }) : res.sendStatus(400);
});

const track: RequestHandler = (req, _, next) => {
  const id = req.query.id;

  if (id) {
    const entries = tracking.get(id) ?? 0;
    tracking.set(id, entries + 1);

    modules.pixel.service.visitPixel(id.toString());
  }

  next();
};

const noCache: RequestHandler = (_, res, next) => {
  res.setHeader("Pragma-directive", "no-cache");
  res.setHeader("Cache-directive", "no-cache");
  res.setHeader("Pragma", "no-cache");
  res.setHeader(
    "Cache-control",
    "no-cache, no-store, must-revalidate, proxy-revalidate"
  );
  res.setHeader("Expires", "0");

  next();
};

const pixelBuffer = fs.readFileSync(PIXEL_PATH);
const pixelBufferLength = pixelBuffer.length;
const svgPixel =
  '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>';
const svgPixelLength = svgPixel.length;
app.get("/p.png", track, noCache, async (_, res) => {
  // res
  //   .writeHead(200, {
  //     "Content-Type": "image/png",
  //     "Content-Length": pixelBufferLength,
  //   })
  //   .end(pixelBuffer);

  res
    .writeHead(200, {
      "Content-Type": "image/svg+xml",
      "Content-Length": svgPixelLength,
    })
    .end(svgPixel); // Todo: Check what is better.

  // Move track here. To serve pixel faster. And tracking can be incremented later on.
});

app.use("/api/users", modules.users.router.get());
app.use("/api/pixels", modules.pixel.router.get());

// databaseClient.initialiseDatabase().then(() => {
//   app.listen(port, () =>
//     console.log(`Server running at http://localhost:${port}`)
//   );
// });

databaseClient.initialiser.initialise().then(() => {
  app.listen(port, () =>
    console.log(`Server running at http://localhost:${port}`)
  );
});
