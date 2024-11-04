import { config } from "./Config.js";
import { Modules } from "./modules/index.js";
import { databaseClient } from "./infrastructure/database/clients/index.js";
import { createServer } from "./server/server.js";

const { port } = config;

const bootstrap = async () => {
  const server = createServer(config, Modules);

  await databaseClient.initialiser.initialise();

  server.listen(port, () =>
    console.log(`Server running at http://localhost:${port}`)
  );
};

bootstrap().catch(console.error);
