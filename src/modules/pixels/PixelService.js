import { randomUUID } from "node:crypto";

export class PixelService {
  constructor(pixelRepository) {
    this.repository = pixelRepository;
  }

  async createPixel(pixelDto) {
    const { type, userId, name, expiresAt, scope } = pixelDto;

    const id = this.#generatePixelId();

    await this.repository.insertPixel(id, type, userId, name, expiresAt, scope);

    return id;
  }

  async getPixelById(pixelId) {
    const pixel = await this.repository.getPixelById(pixelId);
    return pixel;
  }

  async getPixelEntriesByPixelId(pixelId) {
    const entries = await this.repository.getPixelEntriesByPixelId(pixelId);
    return entries;
  }

  async visitPixel(pixelId) {
    this.repository.insertPixelEntry(pixelId);
    this.repository.updatePixelVisits(pixelId);
  }

  async deletePixel(pixelId) {
    const row = await this.repository.deletePixel(pixelId);
    const result = await this.repository.deletePixelEntries(pixelId);
    console.log({ row, result });
    return row;
  }

  #generatePixelId() {
    return randomUUID();
  }
}
