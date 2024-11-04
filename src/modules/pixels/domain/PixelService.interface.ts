import type { PixelDto } from "../models/Pixel/Pixel.dto.js";

export interface PixelService {
  createPixel(pixelDto: PixelDto): Promise<string>;

  getAllPixelsForUser(userId: string): Promise<any[]>;

  getPixelById(pixelId: string): Promise<any>;

  getPixelEntriesByPixelId(pixelId: string): Promise<any[]>;

  visitPixel(pixelId: string): Promise<void>;

  deletePixel(pixelId: string): Promise<any>;
}
