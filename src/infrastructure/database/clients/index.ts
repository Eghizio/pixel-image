import { MySqlDatabaseClient } from "./mysql.js";
import { config } from "../../../Config.js";

export const databaseClient = new MySqlDatabaseClient(config.database);
export type ApplicationDatabaseClient = typeof databaseClient;
