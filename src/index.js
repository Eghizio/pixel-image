import fs from "node:fs";
import { join } from "node:path";
import express from "express";
import morgan from "morgan";
import { PixelController } from "./modules/pixels/PixelController.js";
import { PixelService } from "./modules/pixels/PixelService.js";
import { db } from "./db/db.js";

const environment = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 4000;
const PIXEL_PATH = "./src/pixel.png";

const app = express();
const tracking = new Map();

app.disable("x-powered-by");
app.use(express.json());
app.use(express.static(join("src", "public")));
app.use(morgan("dev"));

if (environment === "development") app.set("json spaces", 2);

app.get("/_/health", (_, res) => res.json({ health: "ok", environment }));

app.get("/_/tracking", (_, res) => {
  return res.json({ entries: Object.fromEntries(tracking.entries()) });
});

app.get("/tracking", (req, res) => {
  const id = req.query.id;
  return id
    ? res.json({ entries: tracking.get(id) ?? 0 })
    : res.sendStatus(400);
});

const track = (req, _, next) => {
  const id = req.query.id;

  if (id) {
    const entries = tracking.get(id) ?? 0;
    tracking.set(id, entries + 1);
    PixelService.visitPixel(id);
  }

  next();
};

const noCache = (_, res, next) => {
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

// app.get("/p.png", track, noCache, async (_, res) => {
//   /* Stream */
//   res.setHeader("Content-Type", "image/png");

//   const stream = fs.createReadStream(PIXEL_PATH);
//   stream.on("open", () => stream.pipe(res));
//   stream.on("error", () => res.writeHead(404).end());
// });

const pixelBuffer = fs.readFileSync(PIXEL_PATH);
const pixelBufferLength = pixelBuffer.length;
app.get("/p.png", track, noCache, async (_, res) => {
  /* In Memory */
  return res
    .writeHead(200, {
      "Content-Type": "image/png",
      "Content-Length": pixelBufferLength,
    })
    .end(pixelBuffer);
  // Move track here. To serve pixel faster. And tracking can be incremented later on.
});

app.use("/pixels", PixelController);

db.initialiseDatabase().then(() => {
  app.listen(PORT, () =>
    console.log(`Server running at http://localhost:${PORT}`)
  );
});
