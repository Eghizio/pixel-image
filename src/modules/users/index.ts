import type { DatabaseClient } from "../../db/database.js";
import { UsersController } from "./UsersController.js";
import { UsersRepository } from "./UsersRepository.js";
import { UsersRouter } from "./UsersRouter.js";
import { UsersService } from "./UsersService.js";

export class UsersModule {
  readonly repository: UsersRepository;
  readonly service: UsersService;
  readonly controller: UsersController;
  readonly router: UsersRouter;

  constructor(databaseClient: DatabaseClient) {
    const repository = new UsersRepository(databaseClient);
    const service = new UsersService(repository);
    const controller = new UsersController(service);
    const router = new UsersRouter(controller);

    this.repository = repository;
    this.service = service;
    this.controller = controller;
    this.router = router;

    console.log(`Initialised UsersModule.`);
  }
}
