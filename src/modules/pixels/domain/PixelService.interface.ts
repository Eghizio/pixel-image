import type { PixelDto } from "../models/Pixel/Pixel.dto.js";

export interface PixelService {
  createPixel(pixelDto: PixelDto): Promise<string>;

  getAllPixelsForUser(userId: string): Promise<void>;

  getPixelById(pixelId: string): Promise<void>;

  getPixelEntriesByPixelId(pixelId: string): Promise<void>;

  visitPixel(pixelId: string): Promise<void>;

  deletePixel(pixelId: string): Promise<any>;
}
