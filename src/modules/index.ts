import { databaseClient } from "../infrastructure/database/clients/index.js";
import { PixelModule } from "./pixels/index.js";
import { UsersModule } from "./users/index.js";

// /[module]/persistence - Extract Repository implementation, use interfaces in domain.
// /[module]/domain - Extract Services, Repositories interfaces.
// /[module]/api - Extract Controllers, Routers & Middlewares.
// /[module]/errors/[persistence/domain/api] - Organise Errors.

export const Modules = {
  users: new UsersModule(databaseClient),
  pixel: new PixelModule(databaseClient),
};

export type ApplicationModules = typeof Modules;
