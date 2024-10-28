import { databaseClient } from "../db/database.js";
import { PixelModule } from "./pixels/index.js";

export const modules = {
  pixel: new PixelModule(databaseClient),
};
