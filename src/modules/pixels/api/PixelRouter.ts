import { Router } from "express";
import type { PixelController } from "./PixelController.js";
import { AuthMiddleware } from "../../../modules/users/middlewares/AuthMiddleware.js"; // Move outside of modules.

export class PixelRouter {
  private router: Router;

  constructor(private controller: PixelController) {
    const router = Router();

    router.get("/visit", this.controller.visitPixel.bind(controller));

    router.post(
      "/",
      AuthMiddleware.requireLoggedInUser,
      this.controller.createPixel.bind(controller)
    );
    router.delete(
      "/:id",
      AuthMiddleware.requireLoggedInUser,
      this.controller.deletePixel.bind(controller)
    );
    router.get(
      "/",
      AuthMiddleware.requireLoggedInUser,
      this.controller.getAllPixels.bind(controller)
    );
    router.get(
      "/id/:id",
      AuthMiddleware.requireLoggedInUser,
      this.controller.getPixel.bind(controller)
    );
    router.get(
      "/id/:id/entries",
      AuthMiddleware.requireLoggedInUser,
      this.controller.getPixelEntries.bind(controller)
    );

    this.router = router;
  }

  get() {
    return this.router;
  }
}
