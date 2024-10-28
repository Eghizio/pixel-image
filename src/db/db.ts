// @ts-ignore
import * as mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "pixels",
});

export class Query {
  readonly name: string;
  readonly text: string;
  values: any[];

  constructor(name: string, text: string, values: any[] = []) {
    this.name = name;
    this.text = text;
    this.values = values;
  }

  withValues(values: any[]) {
    this.values = values;
    return this;
  }
}

const initialisation_query = {
  create_table: {
    pixels: new Query(
      "create_table_pixels",
      `CREATE TABLE IF NOT EXISTS pixels (
        id          CHAR(36) PRIMARY KEY NOT NULL,                  -- UUIDs as CHAR(36) in MySQL
        type        ENUM('GLOBAL', 'SCOPED') NOT NULL,              -- ENUM instead of CHECK constraint
        user_id     CHAR(36) NOT NULL,                              -- UUIDs as CHAR(36) in MySQL
        name        TEXT NOT NULL,
        created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,   -- TIMESTAMP with default
        visits      INT DEFAULT 0 NOT NULL,
        expires_at  TIMESTAMP NULL,                                 -- Optional TIMESTAMP
        scope       TEXT NULL
      );`
    ),
    pixels_entries: new Query(
      "create_table_pixels_entries",
      `CREATE TABLE IF NOT EXISTS pixels_entries (
        pixel_id    CHAR(36) NOT NULL,                              -- UUIDs as CHAR(36)
        visited_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL    -- Default TIMESTAMP value
      );`
    ),
  },
};

const initDb = async (queries: string[]) => {
  await Promise.all(queries.map((query) => pool.execute(query)));
  console.log("Database ready.");
};

const initialiseDatabase = () =>
  initDb([
    initialisation_query.create_table.pixels.text,
    initialisation_query.create_table.pixels_entries.text,
  ]);

export const query = {
  select: {
    pixel_by_id: new Query(
      "select_pixel_by_id",
      `SELECT * FROM pixels WHERE id = ?;`
    ),
    pixel_by_user_id: new Query(
      "select_pixel_by_user_id",
      `SELECT * FROM pixels WHERE user_id = ?;`
    ),
    pixel_by_user_id_and_type: new Query(
      "select_pixel_by_user_id_and_type",
      `SELECT * FROM pixels WHERE user_id = ? AND type = ?;`
    ),
    pixel_entries_by_id: new Query(
      "select_pixel_entries_by_id",
      `SELECT * FROM pixels_entries WHERE pixel_id = ?;`
    ),
  },
  insert: {
    pixel: new Query(
      "insert_pixel",
      `INSERT INTO pixels (id, type, user_id, name, created_at, visits, expires_at, scope) 
       VALUES (?, ?, ?, ?, DEFAULT, DEFAULT, ?, ?);`
    ),
    pixel_entry: new Query(
      "insert_pixel_entry",
      `INSERT INTO pixels_entries (pixel_id, visited_at) VALUES (?, DEFAULT);`
    ),
  },
  upsert: {
    pixel: new Query(
      "upsert_pixel",
      `INSERT INTO pixels (id, type, user_id, name, created_at, visits, expires_at, scope) 
       VALUES (?, ?, ?, ?, DEFAULT, DEFAULT, ?, ?)
       ON DUPLICATE KEY UPDATE
         type = VALUES(type),
         user_id = VALUES(user_id),
         name = VALUES(name),
         created_at = VALUES(created_at),
         visits = VALUES(visits),
         expires_at = VALUES(expires_at),
         scope = VALUES(scope);`
    ),
  },
  update: {
    pixel_visits: new Query(
      "update_pixel_visits",
      `UPDATE pixels SET visits = visits + 1 WHERE id = ?;`
    ),
  },
  delete: {
    pixel_by_id: new Query(
      "delete_pixel_by_id",
      `DELETE FROM pixels WHERE id = ?;`
    ),
    pixel_entries_by_id: new Query(
      "delete_pixel_entries_by_id",
      `DELETE FROM pixels_entries WHERE pixel_id = ?;`
    ),
  },
};

const queryRows = async (q: Query) => {
  const [result] = await pool.execute(q.text, q.values);
  return result;
};

type Queries = typeof query;
type QueryFn = typeof queryRows;

export class DatabaseClient {
  // Todo: Could be database agnostic.
  readonly pool: mysql.Pool;
  readonly query: Queries;
  readonly initialiseDatabase: () => Promise<void>;
  readonly queryRows: QueryFn;

  constructor(
    pool: mysql.Pool,
    query: Queries,
    initialiseDatabase: () => Promise<void>,
    queryRows: QueryFn
  ) {
    this.pool = pool;
    this.query = query;
    this.initialiseDatabase = initialiseDatabase;
    this.queryRows = queryRows;
  }
}

const MySqlClient = new DatabaseClient(
  pool,
  query,
  initialiseDatabase,
  queryRows
);

export const db = MySqlClient;
