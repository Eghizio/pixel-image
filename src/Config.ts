export type Environment = "production" | "development";

export class Config {
  readonly environment: Environment;
  readonly port: number;

  readonly database: {
    readonly host: string;
    readonly user: string;
    readonly password: string;
    readonly database: string;
  };

  constructor() {
    this.environment = this.toEnvironment(
      process.env["NODE_ENV"] || "development"
    );
    this.port = this.normalizePort(process.env["PORT"] || "4000");

    this.database = {
      host: process.env["DATABASE_HOST"] || "localhost",
      user: process.env["DATABASE_USER"] || "root",
      password: process.env["DATABASE_PASSWORD"] || "mysql",
      database: process.env["DATABASE_NAME"] || "pixels",
    };

    this.logSafeConfig();
  }

  private logSafeConfig() {
    const safeConfig = { environment: this.environment, port: this.port };
    console.log(`Loaded config: ${JSON.stringify(safeConfig, null, 2)}`);
  }

  private toEnvironment(environment: string): Environment {
    switch (environment) {
      case "production": {
        return environment;
      }
      case "development": {
        return environment;
      }
      default: {
        throw new Error(`Unknown environment "${environment}".`);
      }
    }
  }

  private normalizePort(port: string): number {
    const parsedPort = parseInt(port, 10);

    if (isNaN(parsedPort)) {
      throw new Error(`Invalid port of "${port}"`);
    }

    const minPort = 0;
    const maxPort = 65_535;

    if (parsedPort < minPort || parsedPort > maxPort) {
      throw new Error(`Port "${parsedPort}" out of range.`);
    }

    return parsedPort;
  }
}

export const config = new Config();
