import { Query } from "../database.js";

export const SELECT_USER_BY_EMAIL = new Query(
  "select_user_by_email",
  `SELECT * FROM users WHERE email = ? LIMIT 1;`
);

export const SELECT_USER_BY_ID = new Query(
  "select_user_by_id",
  `SELECT * FROM users WHERE id = ? LIMIT 1;`
);

export const INSERT_USER = new Query(
  "insert_user",
  `INSERT INTO users (id, email, password, name, created_at, last_seen_at) 
        VALUES (?, ?, ?, ?, DEFAULT, DEFAULT);`
);

export const UPDATE_USER_NAME = new Query(
  "update_user_name",
  `UPDATE users SET name = ? WHERE id = ?;`
);

export const UPDATE_USER_EMAIL = new Query(
  "update_user_email",
  `UPDATE users SET email = ? WHERE id = ?;`
);

export const UPDATE_USER_LAST_SEEN_AT = new Query(
  "update_user_last_seen_at",
  `UPDATE users SET last_seen_at = CURRENT_TIMESTAMP() WHERE id = ?;`
);
