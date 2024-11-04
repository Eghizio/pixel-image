import type { ApplicationDatabaseClient } from "src/infrastructure/database/clients/index.js";
import type { PixelRepository } from "./domain/PixelRepository.interface.js";
import type { PixelService } from "./domain/PixelService.interface.js";
import { MySqlPixelRepository } from "./persistence/MySqlPixelRepository.js";
import { DefaultPixelService } from "./domain/DefaultPixelService.js";
import { PixelController } from "./api/PixelController.js";
import { PixelRouter } from "./api/PixelRouter.js";

export class PixelModule {
  readonly repository: PixelRepository;
  readonly service: PixelService;
  readonly controller: PixelController;
  readonly router: PixelRouter;

  constructor(databaseClient: ApplicationDatabaseClient) {
    const repository = new MySqlPixelRepository(databaseClient);
    const service = new DefaultPixelService(repository);
    const controller = new PixelController(service);
    const router = new PixelRouter(controller);

    this.repository = repository;
    this.service = service;
    this.controller = controller;
    this.router = router;

    console.log(`Initialised PixelModule.`);
  }
}
