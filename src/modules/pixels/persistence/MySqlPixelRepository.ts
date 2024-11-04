import type { ApplicationDatabaseClient } from "../../../infrastructure/database/clients/index.js";
import type { PixelRepository } from "../domain/PixelRepository.interface.js";
import type { PixelType } from "../models/Pixel/Pixel.model.js";
import {
  DELETE_PIXEL_BY_ID,
  DELETE_PIXEL_ENTRIES_BY_ID,
  INSERT_PIXEL,
  INSERT_PIXEL_ENTRY,
  SELECT_PIXEL_BY_ID,
  SELECT_PIXEL_BY_USER_ID,
  SELECT_PIXEL_BY_USER_ID_AND_TYPE,
  SELECT_PIXEL_ENTRIES_BY_ID,
  UPDATE_PIXEL_VISITS,
  UPSERT_PIXEL,
} from "../../../infrastructure/database/queries/pixels.js";

// Todo: Return Pixel Entities.
export class MySqlPixelRepository implements PixelRepository {
  constructor(private db: ApplicationDatabaseClient) {}

  async getPixelById(id: string) {
    const q = SELECT_PIXEL_BY_ID.withValues([id]);
    return this.db.executeQuery(q);
  }
  async getPixelByUserId(user_id: string) {
    const q = SELECT_PIXEL_BY_USER_ID.withValues([user_id]);
    return this.db.executeQuery(q);
  }
  async getPixelByUserIdOfType(user_id: string, type: PixelType) {
    const q = SELECT_PIXEL_BY_USER_ID_AND_TYPE.withValues([user_id, type]);
    return this.db.executeQuery(q);
  }
  async getPixelEntriesByPixelId(pixel_id: string) {
    const q = SELECT_PIXEL_ENTRIES_BY_ID.withValues([pixel_id]);
    return this.db.executeQuery(q);
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
    const q = INSERT_PIXEL.withValues(values);
    return this.db.executeQuery(q);
  }

  // Separate repository?
  async insertPixelEntry(pixel_id: string) {
    const q = INSERT_PIXEL_ENTRY.withValues([pixel_id]);
    return this.db.executeQuery(q);
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
    const q = UPSERT_PIXEL.withValues(values);
    return this.db.executeQuery(q);
  }

  async updatePixelVisits(id: string) {
    const q = UPDATE_PIXEL_VISITS.withValues([id]);
    return this.db.executeQuery(q);
  }

  async deletePixel(id: string) {
    const q = DELETE_PIXEL_BY_ID.withValues([id]);
    return this.db.executeQuery(q);
  }

  // Separate repository?
  async deletePixelEntries(pixel_id: string) {
    const q = DELETE_PIXEL_ENTRIES_BY_ID.withValues([pixel_id]);
    return this.db.executeQuery(q);
  }
}
