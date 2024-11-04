import type { PixelType } from "../models/Pixel/Pixel.model.js";

// Todo: Return Pixel Entities.
export interface PixelRepository {
  getPixelById(id: string): Promise<any>;

  getPixelByUserId(user_id: string): Promise<any>;

  getPixelByUserIdOfType(user_id: string, type: PixelType): Promise<any>;

  getPixelEntriesByPixelId(pixel_id: string): Promise<any>;

  insertPixel(
    id: string,
    type: PixelType,
    user_id: string,
    name: string,
    expires_at: Date | null,
    scope: string | null
  ): Promise<any>;

  // Separate repository?
  insertPixelEntry(pixel_id: string): Promise<any>;

  upsertPixel(
    id: string,
    type: PixelType,
    user_id: string,
    name: string,
    expires_at: Date | null,
    scope: string | null
  ): Promise<any>;

  updatePixelVisits(id: string): Promise<any>;

  deletePixel(id: string): Promise<any>;

  // Separate repository?
  deletePixelEntries(pixel_id: string): Promise<any>;
}
