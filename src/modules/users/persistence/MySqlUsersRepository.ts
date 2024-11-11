import type { ApplicationDatabaseClient } from "../../../infrastructure/database/clients/index.js";
import type { UsersRepository } from "../domain/UsersRepository.interface.js";
import {
  INSERT_USER,
  SELECT_USER_BY_EMAIL,
  SELECT_USER_BY_ID,
  UPDATE_USER_NAME,
  UPDATE_USER_EMAIL,
  UPDATE_USER_LAST_SEEN_AT,
} from "../../../infrastructure/database/queries/users.js";

// Todo: Return Entities.
export class MySqlUsersRepository implements UsersRepository {
  constructor(private db: ApplicationDatabaseClient) {}

  async insertUser(id: string, email: string, password: string, name: string) {
    const q = INSERT_USER.withValues([id, email, password, name]);
    return this.db.executeQuery(q);
  }

  // Return Entity
  async getUserByEmail(email: string) {
    const q = SELECT_USER_BY_EMAIL.withValues([email]);
    return this.db.executeQuery(q);
  }

  // Return Entity
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

  updateUserLastSeenAt(id: string): Promise<any> {
    const q = UPDATE_USER_LAST_SEEN_AT.withValues([id]);
    return this.db.executeQuery(q);
  }
}
