import type { ApplicationDatabaseClient } from "src/infrastructure/database/clients/index.js";
import type { UsersRepository } from "./domain/UsersRepository.interface.js";
import type { UsersService } from "./domain/UsersService.interface.js";
import { MySqlUsersRepository } from "./persistence/MySqlUsersRepository.js";
import { DefaultUsersService } from "./domain/DefaultUsersService.js";
import { UsersController } from "./api/UsersController.js";
import { UsersRouter } from "./api/UsersRouter.js";

export class UsersModule {
  readonly repository: UsersRepository;
  readonly service: UsersService;
  readonly controller: UsersController;
  readonly router: UsersRouter;

  constructor(databaseClient: ApplicationDatabaseClient) {
    const repository = new MySqlUsersRepository(databaseClient);
    const service = new DefaultUsersService(repository);
    const controller = new UsersController(service);
    const router = new UsersRouter(controller);

    this.repository = repository;
    this.service = service;
    this.controller = controller;
    this.router = router;

    console.log(`Initialised UsersModule.`);
  }
}
