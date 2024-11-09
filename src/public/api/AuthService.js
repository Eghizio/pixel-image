import { RestClient } from "./RestClient.js";

export class AuthService {
  #client;

  constructor() {
    this.#client = new RestClient(
      "/api/users",
      { "Content-Type": "application/json" },
      { credentials: "include" }
    );
  }

  async register(email, password) {
    try {
      return await this.#client.post(`/`, { email, password });
    } catch (error) {
      console.error(error);
    }
  }

  async login(email, password) {
    try {
      return await this.#client.post(`/session`, { email, password });
    } catch (error) {
      console.error(error);
    }
  }

  async logout() {
    try {
      return await this.#client.delete(`/session`);
    } catch (error) {
      console.error(error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.#client.get(`/session`);
    } catch (error) {
      console.error(error);
    }
  }

  async changeUsersName(name) {
    try {
      return await this.#client.patch(`/name`, { name });
    } catch (error) {
      console.error(error);
    }
  }

  async changeUsersEmail(email) {
    try {
      return await this.#client.patch(`/email`, { email });
    } catch (error) {
      console.error(error);
    }
  }
}
