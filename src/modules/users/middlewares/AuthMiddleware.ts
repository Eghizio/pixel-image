import type { NextFunction, Request, Response } from "express";
import { JWT } from "../../../lib/JWT.js";

// Todo: Probably UserController, UserRouter & Middlewares should be moved to /src/api/users, same applies for pixels.

// This middleware should be shared. So it won't belong to Users Module.

export class AuthMiddleware {
  static async requireLoggedInUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const token: string = req.signedCookies[JWT.TOKEN_NAME];

    // Expiration is quite short. That's why errors.
    // console.log(req.cookies);
    // console.log(req.signedCookies);

    if (!token) {
      console.log("No token");
      res.sendStatus(401);
      return;
    }

    const isVerifiedToken = await JWT.verify(token);

    const decoded = JWT.decode(token);
    const isValidToken = // @ts-ignore // Todo: Fix
      typeof decoded?.data?.id === "string" && decoded?.data?.id?.length !== 0;

    if (!isVerifiedToken || !isValidToken) {
      console.log("Invalid token");
      res.sendStatus(403);
      return;
    }

    next();
  }
}
