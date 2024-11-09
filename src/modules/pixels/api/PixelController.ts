import type { Request, Response } from "express";
import type { PixelService } from "../domain/PixelService.interface.js";
import { PixelDto } from "../models/Pixel/Pixel.dto.js";
import { JWT } from "../../../lib/JWT.js";

export class PixelController {
  constructor(private service: PixelService) {}

  // POST /api/pixels
  async createPixel(req: Request, res: Response) {
    // Get userId from request headers or smthing auth.
    const userId = await this.getUserIdFromToken(req);

    const type: PixelDto["type"] = "GLOBAL"; // As for now all pixels are GLOBAL. SCOPED :soontm:

    const dto = new PixelDto({ ...req.body, type, userId });

    const id = await this.service.createPixel(dto);

    res.status(201).json({ id });
    return;
  }

  // DELETE /api/pixels/:id
  async deletePixel(req: Request, res: Response) {
    const userId = await this.getUserIdFromToken(req);
    // Adjust so the only pixels allowed to delete are owned by this user.

    const id = req.params["id"];

    const pixel = await this.service.getPixelById(id);

    console.log({ userId, pixel });
    if (pixel.user_id !== userId) {
      res.sendStatus(401);
      return;
    }

    // Validate user auth to perform action.
    await this.service.deletePixel(pixel.id); // Should accept userId and handle further validation except middleware layer validation.

    res.sendStatus(204);
    return;
  }

  // GET /api/pixels/id/:id
  async getAllPixels(req: Request, res: Response) {
    const userId = await this.getUserIdFromToken(req);

    const pixel = await this.service.getAllPixelsForUser(userId);

    res.json(pixel);
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

  private async getUserIdFromToken(req: Request) {
    // Todo: Get from Auth in a clean way.
    const token = req.signedCookies[JWT.TOKEN_NAME];
    const decoded = JWT.decode(token);
    // @ts-ignore // Todo: Adjust.
    const userId = decoded.data.id as string;

    return userId;
  }
}
