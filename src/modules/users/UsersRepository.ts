import type { DatabaseClient } from "../../db/database.js";

export class UsersRepository {
  constructor(private db: DatabaseClient) {}

  async insertUser(id: string, email: string, password: string, name: string) {
    const q = this.db.query.insert.user.withValues([id, email, password, name]);
    return this.db.queryRows(q);
  }

  async getUserByEmail(email: string) {
    const q = this.db.query.select.user_by_email.withValues([email]);
    return this.db.queryRows(q);
  }

  async getUserById(id: string) {
    const q = this.db.query.select.user_by_id.withValues([id]);
    return this.db.queryRows(q);
  }

  async updateUserNameById(name: string, id: string) {
    const q = this.db.query.update.user_name.withValues([name, id]);
    return this.db.queryRows(q);
  }

  async updateUserEmailById(email: string, id: string) {
    const q = this.db.query.update.user_email.withValues([email, id]);
    return this.db.queryRows(q);
  }
}
