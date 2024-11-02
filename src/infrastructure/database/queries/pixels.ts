import { Query } from "../database.js";

export const SELECT_PIXEL_BY_ID = new Query(
  "select_pixel_by_id",
  `SELECT * FROM pixels WHERE id = ?;`
);

export const SELECT_PIXEL_BY_USER_ID = new Query(
  "select_pixel_by_user_id",
  `SELECT * FROM pixels WHERE user_id = ?;`
);

export const SELECT_PIXEL_BY_USER_ID_AND_TYPE = new Query(
  "select_pixel_by_user_id_and_type",
  `SELECT * FROM pixels WHERE user_id = ? AND type = ?;`
);

export const INSERT_PIXEL = new Query(
  "insert_pixel",
  `INSERT INTO pixels (id, type, user_id, name, created_at, visits, expires_at, scope) 
        VALUES (?, ?, ?, ?, DEFAULT, DEFAULT, ?, ?);`
);

export const UPSERT_PIXEL = new Query(
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
);

export const UPDATE_PIXEL_VISITS = new Query(
  "update_pixel_visits",
  `UPDATE pixels SET visits = visits + 1 WHERE id = ?;`
);

export const DELETE_PIXEL_BY_ID = new Query(
  "delete_pixel_by_id",
  `DELETE FROM pixels WHERE id = ?;`
);

// /queries/pixels_entries.ts ? queries per table? what about cross table queries?
export const SELECT_PIXEL_ENTRIES_BY_ID = new Query(
  "select_pixel_entries_by_id",
  `SELECT * FROM pixels_entries WHERE pixel_id = ?;`
);

export const INSERT_PIXEL_ENTRY = new Query(
  "insert_pixel_entry",
  `INSERT INTO pixels_entries (pixel_id, visited_at) VALUES (?, DEFAULT);`
);

export const DELETE_PIXEL_ENTRIES_BY_ID = new Query(
  "delete_pixel_entries_by_id",
  `DELETE FROM pixels_entries WHERE pixel_id = ?;`
);
