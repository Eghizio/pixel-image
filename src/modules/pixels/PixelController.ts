import { Router } from "express";
import { PixelService } from "./PixelService.js";
import { PixelDto } from "./models/Pixel.dto.js";
import { PixelRepository } from "./PixelRepository.js";
import { db } from "../../db/db.js";

export const PixelController = Router(); // `/pixels`

const repository = new PixelRepository(db);
export const service = new PixelService(repository); // temp export

// Todo: Convert to class.
PixelController.post("/", async (req, res) => {
  const dto = new PixelDto(req.body);
  // Get userId from request headers or smthing auth.

  const id = await service.createPixel(dto);

  res.status(201).json({ id });
  return;
});

PixelController.delete("/:id", async (req, res) => {
  const id = req.params["id"];

  // Validate user auth to perform action.
  await service.deletePixel(id);

  res.sendStatus(204);
  return;
});

PixelController.get("/id/:id", async (req, res) => {
  const id = req.params["id"];

  const pixel = await service.getPixelById(id);

  res.json(pixel);
  return;
});

PixelController.get("/id/:id/entries", async (req, res) => {
  const id = req.params["id"];

  const entries = await service.getPixelEntriesByPixelId(id);

  res.json(entries);
  return;
});

// TODO: Remove - temporary for testing.
PixelController.get("/visit", async (req, res) => {
  const id = req.query["id"];

  if (!id) {
    res.sendStatus(404);
    return;
  }

  await service.visitPixel(id.toString());

  res.sendStatus(200);
  return;
});
