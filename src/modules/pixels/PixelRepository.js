export class PixelRepository {
  constructor(databaseClient) {
    this.db = databaseClient;
  }

  async getPixelById(id) {
    const q = this.db.query.select.pixel_by_id.withValues([id]);
    return this.db.queryRows(q);
  }
  async getPixelByUserId(user_id) {
    const q = this.db.query.select.pixel_by_user_id.withValues([user_id]);
    return this.db.queryRows(q);
  }
  async getPixelByUserIdOfType(user_id, type) {
    const q = this.db.query.select.pixel_by_user_id.withValues([user_id, type]);
    return this.db.queryRows(q);
  }
  async getPixelEntriesByPixelId(pixel_id) {
    const q = this.db.query.select.pixel_entries_by_id.withValues([pixel_id]);
    return this.db.queryRows(q);
  }

  async insertPixel(id, type, user_id, name, expires_at, scope) {
    const values = [id, type, user_id, name, expires_at, scope];
    const q = this.db.query.insert.pixel.withValues(values);
    return this.db.queryRows(q);
  }
  async insertPixelEntry(pixel_id) {
    const q = this.db.query.insert.pixel_entry.withValues([pixel_id]);
    return this.db.queryRows(q);
  }

  async upsertPixel(id, type, user_id, name, expires_at, scope) {
    const values = [id, type, user_id, name, expires_at, scope];
    const q = this.db.query.upsert.pixel.withValues(values);
    return this.db.queryRows(q);
  }

  async updatePixelVisits(pixel_id) {
    const q = this.db.query.update.pixel_visits.withValues([pixel_id]);
    return this.db.queryRows(q);
  }

  async deletePixel(id) {
    const q = this.db.query.delete.pixel_by_id.withValues([id]);
    return this.db.queryRows(q);
  }
  async deletePixelEntries(pixel_id) {
    const q = this.db.query.delete.pixel_entries_by_id.withValues([pixel_id]);
    return this.db.queryRows(q);
  }
}
