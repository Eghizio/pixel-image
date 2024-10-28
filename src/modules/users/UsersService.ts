import { randomUUID } from "node:crypto";
import type { UsersRepository } from "./UsersRepository";

export class UsersService {
  constructor(private repository: UsersRepository) {}
}
