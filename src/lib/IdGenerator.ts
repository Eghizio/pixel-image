import { randomUUID } from "crypto";

export class IdGenerator {
  static generate(): string {
    return randomUUID();
  }
}
