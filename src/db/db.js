import { postgresClient } from "./timescaledb.js";
import { mysqlClient } from "./mysql.js";

const DATABASE_CLIENT = {
  POSTGRES: postgresClient,
  MYSQL: mysqlClient,
};

const dbClient = process.env.DB_CLIENT || "MYSQL";

export const db = DATABASE_CLIENT[dbClient];
