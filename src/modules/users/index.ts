import type { DatabaseClient } from "../../db/database.js";

export class PixelModule {
  readonly repository: PixelRepository;
  readonly service: PixelService;
  readonly controller: PixelController;
  readonly router: PixelRouter;

  constructor(databaseClient: DatabaseClient) {
    const repository = new PixelRepository(databaseClient);
    const service = new PixelService(repository);
    const controller = new PixelController(service);
    const router = new PixelRouter(controller);

    this.repository = repository;
    this.service = service;
    this.controller = controller;
    this.router = router;

    console.log(`Initialised PixelModule.`);
  }
}
