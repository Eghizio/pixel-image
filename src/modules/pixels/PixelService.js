import { randomUUID } from "node:crypto";
import { PixelRepository } from "./PixelRepository.js";

export const PixelService = {
  async createPixel(pixelDto) {
    const { type, user_id, name, expires_at = null, scope = null } = pixelDto;

    const id = await this.generatePixelId(user_id, name);

    await PixelRepository.insertPixel(
      id,
      type,
      user_id,
      name,
      expires_at,
      scope
    );

    return id;
  },

  async getPixelById(pixelId) {
    const pixel = await PixelRepository.getPixelById(pixelId);
    return pixel;
  },

  async getPixelEntriesByPixelId(pixelId) {
    const entries = await PixelRepository.getPixelEntriesByPixelId(pixelId);
    return entries;
  },

  async visitPixel(pixelId) {
    PixelRepository.insertPixelEntry(pixelId);
    PixelRepository.updatePixelVisits(pixelId);
  },

  async deletePixel(pixelId) {
    const row = await PixelRepository.deletePixel(pixelId);
    const result = await PixelRepository.deletePixelEntries(pixelId);
    console.log({ row, result });
    return row;
  },

  async generatePixelId(userId, name) {
    return randomUUID();
  },
};
