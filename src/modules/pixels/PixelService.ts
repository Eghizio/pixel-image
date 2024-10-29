import type { PixelRepository } from "./PixelRepository.js";
import { PixelDto } from "./models/Pixel/Pixel.dto.js";
import { IdGenerator } from "../../lib/IdGenerator.js";

export class PixelService {
  constructor(private repository: PixelRepository) {}

  async createPixel(pixelDto: PixelDto) {
    const { type, userId, name, expiresAt, scope } = pixelDto;

    const id = IdGenerator.generate();

    await this.repository.insertPixel(id, type, userId, name, expiresAt, scope);

    return id;
  }

  async getPixelById(pixelId: string) {
    const pixel = await this.repository.getPixelById(pixelId);
    return pixel;
  }

  async getPixelEntriesByPixelId(pixelId: string) {
    const entries = await this.repository.getPixelEntriesByPixelId(pixelId);
    return entries;
  }

  async visitPixel(pixelId: string) {
    this.repository.insertPixelEntry(pixelId);
    this.repository.updatePixelVisits(pixelId);
  }

  async deletePixel(pixelId: string) {
    const row = await this.repository.deletePixel(pixelId);
    const result = await this.repository.deletePixelEntries(pixelId);
    console.log({ row, result });
    return row;
  }
}
