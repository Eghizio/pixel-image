import { db } from "../../db/db.js";

export const PixelRepository = {
  async getPixelById(id) {
    const q = db.query.select.pixel_by_id.withValues([id]);
    return db.queryRows(q);
  },
  async getPixelByUserId(user_id) {
    const q = db.query.select.pixel_by_user_id.withValues([user_id]);
    return db.queryRows(q);
  },
  async getPixelByUserIdOfType(user_id, type) {
    const q = db.query.select.pixel_by_user_id.withValues([user_id, type]);
    return db.queryRows(q);
  },
  async getPixelEntriesByPixelId(pixel_id) {
    const q = db.query.select.pixel_entries_by_id.withValues([pixel_id]);
    return db.queryRows(q);
  },

  async insertPixel(id, type, user_id, name, expires_at = null, scope = null) {
    const values = [id, type, user_id, name, expires_at, scope];
    const q = db.query.insert.pixel.withValues(values);
    return db.queryRows(q);
  },
  async insertPixelEntry(pixel_id) {
    const q = db.query.insert.pixel_entry.withValues([pixel_id]);
    return db.queryRows(q);
  },

  async upsertPixel(id, type, user_id, name, expires_at = null, scope = null) {
    const values = [id, type, user_id, name, expires_at, scope];
    const q = db.query.upsert.pixel.withValues(values);
    return db.queryRows(q);
  },

  async updatePixelVisits(pixel_id) {
    const q = db.query.update.pixel_visits.withValues([pixel_id]);
    return db.queryRows(q);
  },

  async deletePixel(id) {
    const q = db.query.delete.pixel_by_id.withValues([id]);
    return db.queryRows(q);
  },
  async deletePixelEntries(pixel_id) {
    const q = db.query.delete.pixel_entries_by_id.withValues([pixel_id]);
    return db.queryRows(q);
  },
};
