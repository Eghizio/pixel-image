import pg from "pg";

// Todo: Adjust to MySQL as well.
// Due to Mikrus Frog limitations, PGSQL and TimescaleDB might be off the table for now.
export const pool = new pg.Pool({
  host: "localhost",
  port: "5432",
  user: "postgres",
  password: "postgres",
  application_name: "pixel-image",
});

const Query = (name, text, values = []) => ({
  name,
  text,
  values,
  withValues(values) {
    this.values = values;
    return this;
  },
});

const initialisation_query = {
  create_table: {
    pixels: Query(
      "create_table_pixels",
      `CREATE TABLE IF NOT EXISTS pixels (
        id          UUID PRIMARY KEY                            NOT NULL,
        type        TEXT CHECK (type IN ('GLOBAL', 'SCOPED'))   NOT NULL,
        user_id     UUID                                        NOT NULL,
        name        TEXT                                        NOT NULL,
        created_at  TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP       NOT NULL,
        visits      INT DEFAULT 0                               NOT NULL,
        expires_at  TIMESTAMPTZ                                 NULL,
        scope       TEXT                                        NULL
    );`
    ),
    pixels_entries: Query(
      "create_table_pixels_entries",
      `CREATE TABLE IF NOT EXISTS pixels_entries (
        pixel_id    UUID                                        NOT NULL,
        visited_at  TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP       NOT NULL
    );`
    ),
  },
  enhance: {
    pixels_entries_hypertable: Query(
      "enhance_pixels_entries_hypertable",
      `SELECT create_hypertable('pixels_entries', by_range('visited_at'), if_not_exists => TRUE);`
    ),
  },
};

const initDb = async (queries) => {
  const client = await pool.connect();
  const results = await Promise.all(
    queries.map((query) => client.query(query))
  );
  // console.log(
  //   results,
  //   results.map((r) => r.rows)
  // );
  console.log("Database ready.");
  client.release();
};

export const initialiseDatabase = () =>
  initDb([
    initialisation_query.create_table.pixels,
    initialisation_query.create_table.pixels_entries,
    initialisation_query.enhance.pixels_entries_hypertable,
  ]);

export const query = {
  select: {
    pixel_by_id: Query(
      "select_pixel_by_id",
      `SELECT * FROM pixels WHERE id = $1;`
    ),
    pixel_by_user_id: Query(
      "select_pixel_by_user_id",
      `SELECT * FROM pixels WHERE user_id = $1;`
    ),
    pixel_by_user_id_and_type: Query(
      "select_pixel_by_user_id_and_type",
      `SELECT * FROM pixels WHERE user_id = $1 AND type = $2;`
    ),
    pixel_entries_by_id: Query(
      "select_pixel_entries_by_id",
      `SELECT * FROM pixels_entries WHERE pixel_id = $1;`
    ),
  },
  insert: {
    pixel: Query(
      "insert_pixel",
      `INSERT INTO pixels (id, type, user_id, name, created_at, visits, expires_at, scope) 
      VALUES ($1, $2, $3, $4, DEFAULT, DEFAULT, $5, $6);`
    ),
    pixel_entry: Query(
      "insert_pixel_entry",
      `INSERT INTO pixels_entries (pixel_id, visited_at) VALUES ($1, DEFAULT);`
    ),
  },
  upsert: {
    pixel: Query(
      "upsert_pixel", // Will that override created_at & visits??
      `INSERT INTO pixels (id, type, user_id, name, created_at, visits, expires_at, scope) 
      VALUES ($1, $2, $3, $4, DEFAULT, DEFAULT, $5, $6) 
      ON CONFLICT (id) DO UPDATE SET
        type = EXCLUDED.type,
        user_id = EXCLUDED.user_id,
        name = EXCLUDED.name,
        created_at = EXCLUDED.created_at,
        visits = EXCLUDED.visits,
        expires_at = EXCLUDED.expires_at,
        scope = EXCLUDED.scope;`
    ),
  },
  update: {
    pixel_visits: Query(
      "update_pixel_visits",
      `UPDATE pixels SET visits = visits + 1 WHERE id = $1;`
    ),
  },
  delete: {
    pixel_by_id: Query(
      "delete_pixel_by_id",
      `DELETE FROM pixels WHERE id = $1;`
    ),
    pixel_entries_by_id: Query(
      "delete_pixel_entries_by_id",
      `DELETE FROM pixels_entries WHERE pixel_id = $1;`
    ),
  },
};

const queryRows = async (q) => {
  const result = await pool.query(q);
  return result.rows;
};

export const postgresClient = {
  pool,
  query,
  initialiseDatabase,
  queryRows,
};
