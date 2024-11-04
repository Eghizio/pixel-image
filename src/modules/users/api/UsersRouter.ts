import { Router } from "express";
import type { UsersController } from "./UsersController.js";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js";

export class UsersRouter {
  private router: Router;

  constructor(private controller: UsersController) {
    const router = Router();

    router.post("/session", this.controller.loginUser.bind(controller));
    router.delete(
      "/session",
      AuthMiddleware.requireLoggedInUser,
      this.controller.logoutUser.bind(controller)
    );
    router.get(
      "/session",
      AuthMiddleware.requireLoggedInUser,
      this.controller.getCurrentUser.bind(controller)
    );

    router.patch(
      "/name",
      AuthMiddleware.requireLoggedInUser,
      this.controller.updateUsersName.bind(controller)
    );
    router.patch(
      "/email",
      AuthMiddleware.requireLoggedInUser,
      this.controller.updateUsersEmail.bind(controller)
    );

    // Having a decorator in Controller for Endpoint would be nice.
    router.post("/", this.controller.registerUser.bind(controller));
    router.delete(
      "/:id",
      AuthMiddleware.requireLoggedInUser,
      this.controller.deleteUser.bind(controller)
    );

    this.router = router;
  }

  get() {
    return this.router;
  }
}
