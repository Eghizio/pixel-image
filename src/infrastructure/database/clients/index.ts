import { MySqlDatabaseClient } from "./mysql.js";
import { config } from "../../../Config.js";

export type ApplicationDatabaseClient = MySqlDatabaseClient;
export const databaseClient = new MySqlDatabaseClient(config.database);
