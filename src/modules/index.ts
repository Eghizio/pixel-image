import { databaseClient } from "../db/database.js";
import { PixelModule } from "./pixels/index.js";
import { UsersModule } from "./users/index.js";

export const modules = {
  users: new UsersModule(databaseClient),
  pixel: new PixelModule(databaseClient),
};
