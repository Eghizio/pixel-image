import { join } from "node:path";
import express, { Router } from "express";

export const createPublicRouter = () => {
  const PublicRouter = Router();

  PublicRouter.use(express.static(join("src", "public")));

  return PublicRouter;
};
