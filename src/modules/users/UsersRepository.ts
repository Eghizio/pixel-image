import type { DatabaseClient } from "../../db/database.js";

export class UsersRepository {
  constructor(private db: DatabaseClient) {}
}
