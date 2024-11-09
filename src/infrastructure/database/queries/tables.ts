import { Query } from "../database.js";

export const CREATE_PIXELS_TABLE = new Query(
  "create_table_pixels",
  `CREATE TABLE IF NOT EXISTS pixels (
        id          CHAR(36) PRIMARY KEY NOT NULL,
        type        ENUM('GLOBAL', 'SCOPED') NOT NULL,
        user_id     CHAR(36) NOT NULL,
        name        TEXT NOT NULL,
        created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        visits      INT DEFAULT 0 NOT NULL,
        expires_at  TIMESTAMP NULL,
        scope       TEXT NULL,
        UNIQUE (id),
        FOREIGN KEY (user_id) REFERENCES users(id)
    );`
);

export const CREATE_PIXELS_ENTRIES_TABLE = new Query(
  "create_table_pixels_entries",
  `CREATE TABLE IF NOT EXISTS pixels_entries (
        pixel_id    CHAR(36) NOT NULL,
        visited_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
    );` // FOREIGN KEY (pixel_id) REFERENCES pixels(id)
);

export const CREATE_USERS_TABLE = new Query(
  "create_table_users",
  `CREATE TABLE IF NOT EXISTS users (
        id            CHAR(36) PRIMARY KEY NOT NULL,
        email         VARCHAR(255) NOT NULL,
        password      VARCHAR(255) NOT NULL,
        name          TEXT NOT NULL,
        created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        last_seen_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        UNIQUE (id),
        UNIQUE (email),
        CONSTRAINT UC_User UNIQUE (id, email)
    );`
);
