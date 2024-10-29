import type { DatabaseClient } from "../../db/database.js";
import type { PixelType } from "./models/Pixel/Pixel.model.js";

// Todo: Return Pixel Entities.
export class PixelRepository {
  constructor(private db: DatabaseClient) {}

  async getPixelById(id: string) {
    const q = this.db.query.select.pixel_by_id.withValues([id]);
    return this.db.queryRows(q);
  }
  async getPixelByUserId(user_id: string) {
    const q = this.db.query.select.pixel_by_user_id.withValues([user_id]);
    return this.db.queryRows(q);
  }
  async getPixelByUserIdOfType(user_id: string, type: PixelType) {
    const q = this.db.query.select.pixel_by_user_id.withValues([user_id, type]);
    return this.db.queryRows(q);
  }
  async getPixelEntriesByPixelId(pixel_id: string) {
    const q = this.db.query.select.pixel_entries_by_id.withValues([pixel_id]);
    return this.db.queryRows(q);
  }

  async insertPixel(
    id: string,
    type: PixelType,
    user_id: string,
    name: string,
    expires_at: Date | null,
    scope: string | null
  ) {
    const values = [id, type, user_id, name, expires_at, scope];
    const q = this.db.query.insert.pixel.withValues(values);
    return this.db.queryRows(q);
  }

  // Separate repository?
  async insertPixelEntry(pixel_id: string) {
    const q = this.db.query.insert.pixel_entry.withValues([pixel_id]);
    return this.db.queryRows(q);
  }

  async upsertPixel(
    id: string,
    type: PixelType,
    user_id: string,
    name: string,
    expires_at: Date | null,
    scope: string | null
  ) {
    const values = [id, type, user_id, name, expires_at, scope];
    const q = this.db.query.upsert.pixel.withValues(values);
    return this.db.queryRows(q);
  }

  async updatePixelVisits(id: string) {
    const q = this.db.query.update.pixel_visits.withValues([id]);
    return this.db.queryRows(q);
  }

  async deletePixel(id: string) {
    const q = this.db.query.delete.pixel_by_id.withValues([id]);
    return this.db.queryRows(q);
  }

  // Separate repository?
  async deletePixelEntries(pixel_id: string) {
    const q = this.db.query.delete.pixel_entries_by_id.withValues([pixel_id]);
    return this.db.queryRows(q);
  }
}
