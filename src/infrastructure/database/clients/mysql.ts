import mysql from "mysql2/promise";
import {
  type DatabaseConfiguration,
  type DatabaseInitialiser,
  type DatabaseClient,
  Query,
} from "../database.js";
import {
  CREATE_PIXELS_ENTRIES_TABLE,
  CREATE_PIXELS_TABLE,
  CREATE_USERS_TABLE,
} from "../queries/tables.js";

export class MySqlDatabaseClient
  implements DatabaseClient<mysql.Pool, mysql.QueryResult>
{
  public pool;
  public initialiser;

  constructor(databaseConfig: DatabaseConfiguration) {
    this.pool = mysql.createPool(databaseConfig);
    this.initialiser = new MySqlDatabaseInitialiser(this); // todo: injectable
    console.log("Database connection established.");
  }

  async executeQuery(query: Query) {
    const [result] = await this.pool.execute(query.text, query.values);
    return result;
  }
}

class MySqlDatabaseInitialiser implements DatabaseInitialiser {
  constructor(private databaseClient: MySqlDatabaseClient) {}

  async initialise() {
    await this.databaseClient.executeQuery(CREATE_USERS_TABLE);
    await this.databaseClient.executeQuery(CREATE_PIXELS_TABLE);
    await this.databaseClient.executeQuery(CREATE_PIXELS_ENTRIES_TABLE);

    console.log("Database ready.");
  }
}
