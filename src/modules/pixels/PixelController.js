import { randomUUID } from "node:crypto";
import { Router } from "express";
import { PixelService } from "./PixelService.js";

export const PixelController = Router(); // `/pixels`

const rnd = () => Math.ceil(Math.random() * 100);

const mockedGlobalPixelDto = {
  type: "GLOBAL",
  user_id: randomUUID(),
  name: `Pixel number ${rnd()}`,
  expires_at: null,
  scope: null,
};

PixelController.post("/", async (req, res) => {
  const payload = req.body;
  console.log({ payload });
  // Get userId from request headers or smthing auth.

  const id = await PixelService.createPixel(mockedGlobalPixelDto);

  return res.status(201).json({ id });
});

PixelController.delete("/:id", async (req, res) => {
  const id = req.params["id"];

  // Validate user auth to perform action.
  await PixelService.deletePixel(id);

  return res.sendStatus(204);
});

PixelController.get("/id/:id", async (req, res) => {
  const id = req.params["id"];

  const pixel = await PixelService.getPixelById(id);

  return res.json(pixel);
});

PixelController.get("/id/:id/entries", async (req, res) => {
  const id = req.params["id"];

  const entries = await PixelService.getPixelEntriesByPixelId(id);

  return res.json(entries);
});

// TODO: Remove - temporary for testing.
PixelController.get("/visit", async (req, res) => {
  const id = req.query["id"];

  await PixelService.visitPixel(id);

  return res.sendStatus(200);
});
