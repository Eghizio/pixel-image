import { Router } from "express";
import type { PixelController } from "./PixelController.js";

export class PixelRouter {
  private router: Router;

  constructor(private controller: PixelController) {
    const router = Router();

    router.post("/", this.controller.createPixel.bind(controller));
    router.delete("/:id", this.controller.deletePixel.bind(controller));
    router.get("/id/:id", this.controller.getPixel.bind(controller));
    router.get(
      "/id/:id/entries",
      this.controller.getPixelEntries.bind(controller)
    );
    router.get("/visit", this.controller.visitPixel.bind(controller));

    this.router = router;
  }

  get() {
    return this.router;
  }
}
