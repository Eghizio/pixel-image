import { Router } from "express";
import type { PixelController } from "./PixelController.js";

export class PixelRouter {
  private router: Router;

  constructor(private controller: PixelController) {
    const router = Router();

    router.post("/", this.controller.createPixel);
    router.delete("/:id", this.controller.deletePixel);
    router.get("/id/:id", this.controller.getPixel);
    router.get("/id/:id/entries", this.controller.getPixelEntries);
    router.get("/visit", this.controller.visitPixel);

    this.router = router;
  }

  get() {
    return this.router;
  }
}
