import type { ApplicationDatabaseClient } from "../../infrastructure/database/clients/index.js";
import {
  INSERT_USER,
  SELECT_USER_BY_EMAIL,
  SELECT_USER_BY_ID,
  UPDATE_USER_NAME,
  UPDATE_USER_EMAIL,
} from "../../infrastructure/database/queries/users.js";

export class UsersRepository {
  constructor(private db: ApplicationDatabaseClient) {}

  async insertUser(id: string, email: string, password: string, name: string) {
    const q = INSERT_USER.withValues([id, email, password, name]);
    return this.db.executeQuery(q);
  }

  async getUserByEmail(email: string) {
    const q = SELECT_USER_BY_EMAIL.withValues([email]);
    return this.db.executeQuery(q);
  }

  async getUserById(id: string) {
    const q = SELECT_USER_BY_ID.withValues([id]);
    return this.db.executeQuery(q);
  }

  async updateUserNameById(name: string, id: string) {
    const q = UPDATE_USER_NAME.withValues([name, id]);
    return this.db.executeQuery(q);
  }

  async updateUserEmailById(email: string, id: string) {
    const q = UPDATE_USER_EMAIL.withValues([email, id]);
    return this.db.executeQuery(q);
  }
}
