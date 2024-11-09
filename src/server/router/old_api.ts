import { type RequestHandler, Router } from "express";
import type { ApplicationModules } from "../../modules/index.js";
// import fs from "node:fs";

// const PIXEL_PATH = "./src/pixel.png";
// const pixelBuffer = fs.readFileSync(PIXEL_PATH);
// const pixelBufferLength = pixelBuffer.length;
const svgPixel =
  '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>';
const svgPixelLength = svgPixel.length;

const tracking = new Map();

export const createOldApiRouter = (Modules: ApplicationModules) => {
  const OldApiRouter = Router();

  OldApiRouter.get("/_/tracking", (_, res) => {
    res.json({ entries: Object.fromEntries(tracking.entries()) });
  });

  OldApiRouter.get("/tracking", (req, res) => {
    const id = req.query.id;
    id ? res.json({ entries: tracking.get(id) ?? 0 }) : res.sendStatus(400);
  });

  const track: RequestHandler = (req, _, next) => {
    const id = req.query.id;

    if (id) {
      const entries = tracking.get(id) ?? 0;
      tracking.set(id, entries + 1);

      Modules.pixel.service.visitPixel(id.toString());
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

  OldApiRouter.get("/p.png", track, noCache, async (_, res) => {
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

  return OldApiRouter;
};
