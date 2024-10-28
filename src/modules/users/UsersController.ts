import { type Request, type Response } from "express";
import type { UsersService } from "./UsersService.js";

export class UsersController {
  constructor(private service: UsersService) {}
}
