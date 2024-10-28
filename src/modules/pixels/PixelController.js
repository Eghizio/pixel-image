import { Router } from "express";
import { PixelService } from "./PixelService.js";
import { PixelDto } from "./models/Pixel.dto.js";
import { PixelRepository } from "./PixelRepository.js";
import { db } from "../../db/db.js";

export const PixelController = Router(); // `/pixels`

const repository = new PixelRepository(db);
const service = new PixelService(repository);

PixelController.post("/", async (req, res) => {
  const dto = new PixelDto(req.body);
  // Get userId from request headers or smthing auth.

  const id = await service.createPixel(dto);

  return res.status(201).json({ id });
});

PixelController.delete("/:id", async (req, res) => {
  const id = req.params["id"];

  // Validate user auth to perform action.
  await service.deletePixel(id);

  return res.sendStatus(204);
});

PixelController.get("/id/:id", async (req, res) => {
  const id = req.params["id"];

  const pixel = await service.getPixelById(id);

  return res.json(pixel);
});

PixelController.get("/id/:id/entries", async (req, res) => {
  const id = req.params["id"];

  const entries = await service.getPixelEntriesByPixelId(id);

  return res.json(entries);
});

// TODO: Remove - temporary for testing.
PixelController.get("/visit", async (req, res) => {
  const id = req.query["id"];

  await service.visitPixel(id);

  return res.sendStatus(200);
});
