import { RestClient } from "./RestClient.js";

export class PixelService {
  #client;

  constructor() {
    this.#client = new RestClient(
      "/api/pixels",
      { "Content-Type": "application/json" },
      { credentials: "include" }
    );
  }

  async createPixel(name, type) {
    try {
      return await this.#client.post(`/`, { name, type });
    } catch (error) {
      console.error(error);
    }
  }

  async getAllPixels() {
    try {
      return await this.#client.get(`/`);
    } catch (error) {
      console.error(error);
    }
  }
  async deletePixel(id) {
    try {
      return await this.#client.delete(`/${id}`);
    } catch (error) {
      console.error(error);
    }
  }
}
