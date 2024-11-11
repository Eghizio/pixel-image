import type { Request, Response } from "express";
import type { UsersService } from "../domain/UsersService.interface.js";
import { UserRequestDto, UserResponseDto } from "../models/User/User.dto.js";
import { UserAlreadyExists } from "../errors/UserAlreadyExists.js";
import { InvalidCredentials } from "../errors/InvalidCredentials.js";
import { config } from "../../../Config.js";
import { JWT } from "../../../lib/JWT.js";

// Cookie expiration.
const WEEK = 7 * 24 * 60 * 60 * 1_000; // Milliseconds.

const AUTH_COOKIE_OPTIONS = {
  // Todo: Figure out and to Config/Envs.
  httpOnly: true,
  // sameSite: "strict",
  sameSite: "lax", // Todo: Research potential vulerabilities.
  maxAge: WEEK,
  signed: true,
  secure: config.environment === "production",
} as const;

export class UsersController {
  constructor(private service: UsersService) {}

  async registerUser(req: Request, res: Response) {
    const dto = new UserRequestDto(req.body);

    try {
      const user = await this.service.registerUser(dto.email, dto.password);

      const token = await this.service.loginUser(dto.email, dto.password);

      res.cookie(JWT.TOKEN_NAME, token, AUTH_COOKIE_OPTIONS);
      res.status(201).json({ user: UserResponseDto.fromEntity(user) });
      return;
    } catch (error) {
      // Todo: Move it to UsersRouter ErrorHandler ?
      if (error instanceof UserAlreadyExists) {
        res.status(400).json({ message: "Email is already in use." }); // OWASP?
        return;
      }
      console.error(error);
      res.sendStatus(500);
      return;
    }
  }

  async loginUser(req: Request, res: Response) {
    const dto = new UserRequestDto(req.body);

    try {
      const token = await this.service.loginUser(dto.email, dto.password);

      const user = await this.service.findUserByEmail(dto.email);

      res.cookie(JWT.TOKEN_NAME, token, AUTH_COOKIE_OPTIONS);

      res.status(200).json({ user });
      // res.status(302);
      return;
    } catch (error) {
      // Todo: Move it to UsersRouter ErrorHandler ?
      if (error instanceof InvalidCredentials) {
        res.status(401).json({ message: "Invalid username or password." }); // OWASP?
        return;
      }
      console.error(error);
      res.sendStatus(500);
      return;
    }
  }

  async logoutUser(req: Request, res: Response) {
    // Todo: Auth - Verify is user has token.

    // Remove cookie.
    res.clearCookie(JWT.TOKEN_NAME);
    res.sendStatus(204);
    return;
  }

  async getCurrentUser(req: Request, res: Response) {
    // Todo: Auth - Verify is user has token.
    const userId = await this.getUserIdFromToken(req);

    const user = await this.service.findUserById(userId);

    if (user === null)
      throw new Error(
        "Ooopsie no user. Maybe account deleted but token remains."
      ); // Delete token?

    res.status(200).json({ user: UserResponseDto.fromEntity(user) });
    return;
  }

  async updateUsersName(req: Request, res: Response) {
    // Todo: Auth - Verify is user has token.
    const name = req.body.name as string; // fix
    const userId = await this.getUserIdFromToken(req);

    await this.service.changeUsersName(name, userId);

    res.status(200).json({ name });
    return;
  }

  async updateUsersEmail(req: Request, res: Response) {
    // Todo: Auth - Verify is user has token.
    const email = req.body.email as string; // fix
    const userId = await this.getUserIdFromToken(req);

    await this.service.changeUsersEmail(email, userId);

    res.status(200).json({ email });
    return;
  }

  async deleteUser(req: Request, res: Response) {
    // Todo: Auth - Verify is user has token.
    res.sendStatus(405); // Todo: Implement & Secure.
    return;
    // await this.service.deleteUser(req.params["id"]);
  }

  private async getUserIdFromToken(req: Request) {
    // Todo: Get from Auth in a clean way.
    const token = req.signedCookies[JWT.TOKEN_NAME];
    const decoded = JWT.decode(token);
    // @ts-ignore // Todo: Adjust.
    const userId = decoded.data.id as string;

    return userId;
  }
}
