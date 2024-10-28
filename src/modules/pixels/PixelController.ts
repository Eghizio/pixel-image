import { type Request, type Response } from "express";
import type { PixelService } from "./PixelService.js";
import { PixelDto } from "./models/Pixel.dto.js";

export class PixelController {
  constructor(private service: PixelService) {}

  // POST /api/pixels
  async createPixel(req: Request, res: Response) {
    const dto = new PixelDto(req.body);
    // Get userId from request headers or smthing auth.

    const id = await this.service.createPixel(dto);

    res.status(201).json({ id });
    return;
  }

  // DELETE /api/pixels/:id
  async deletePixel(req: Request, res: Response) {
    const id = req.params["id"];

    // Validate user auth to perform action.
    await this.service.deletePixel(id);

    res.sendStatus(204);
    return;
  }

  // GET /api/pixels/id/:id
  async getPixel(req: Request, res: Response) {
    const id = req.params["id"];

    const pixel = await this.service.getPixelById(id);

    res.json(pixel);
    return;
  }

  // GET /api/pixels/id/:id/entries
  async getPixelEntries(req: Request, res: Response) {
    const id = req.params["id"];

    const entries = await this.service.getPixelEntriesByPixelId(id);

    res.json(entries);
    return;
  }

  // TODO: Remove - temporary for testing.
  // GET /api/pixels/visit?id=pixelId
  async visitPixel(req: Request, res: Response) {
    const id = req.query["id"];

    if (!id) {
      res.sendStatus(404);
      return;
    }

    await this.service.visitPixel(id.toString());

    res.sendStatus(200);
    return;
  }
}
