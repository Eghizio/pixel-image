// /infrastructure/database/database.ts
export interface DatabaseConfiguration {
  readonly host: string;
  readonly user: string;
  readonly password: string;
  readonly database: string;
}

// /infrastructure/database/database.ts
export class Query {
  readonly name: string;
  readonly text: string;
  values: any[];

  constructor(name: string, text: string, values: any[] = []) {
    this.name = name;
    this.text = text;
    this.values = values;
  }

  withValues(values: any[]) {
    this.values = values;
    return this;
  }
}

export interface DatabaseInitialiser {
  initialise(): Promise<void>;
}

// Rename to DatabaseClient after refactor.
export interface DatabaseClient<Pool, Result> {
  pool: Pool;
  initialiser: DatabaseInitialiser;
  executeQuery(query: Query): Promise<Result>;
}
