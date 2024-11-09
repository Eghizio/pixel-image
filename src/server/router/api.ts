import { Router } from "express";
import type { ApplicationModules } from "../../modules/index.js";

export const createApiRouter = (Modules: ApplicationModules) => {
  const ApiRouter = Router();

  ApiRouter.use("/users", Modules.users.router.get());

  ApiRouter.use("/pixels", Modules.pixel.router.get());

  return ApiRouter;
};
