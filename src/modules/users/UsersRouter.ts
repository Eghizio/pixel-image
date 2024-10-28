import { Router } from "express";
import type { UsersController } from "./UsersController";

export class UsersRouter {
  private router: Router;

  constructor(private controller: UsersController) {
    const router = Router();

    this.router = router;
  }

  get() {
    return this.router;
  }
}
