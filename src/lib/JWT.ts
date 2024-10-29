import jwt, { type SignOptions } from "jsonwebtoken";
import { config } from "../Config.js";

export class JWT {
  static readonly TOKEN_NAME = "_pxt";

  static async sign(data: {}): Promise<string> {
    // Todo: Config?.
    const MIN_15 = 15;
    const iat = Math.floor(Date.now() / 1000);
    // const exp = iat + MIN_15;

    const payload = { iat, data };

    const options: SignOptions = { expiresIn: MIN_15 };

    return new Promise((resolve, reject) => {
      jwt.sign(payload, config.secrets.jwt, options, (error, token) =>
        error
          ? reject(error)
          : token
          ? resolve(token)
          : reject(new Error("Undefined token."))
      );
    });
  }

  static async verify(token: string): Promise<boolean> {
    return new Promise((resolve) => {
      jwt.verify(token, config.secrets.jwt, (error) =>
        error ? resolve(false) : resolve(true)
      );
    });
  }

  static decode(token: string) {
    return jwt.decode(token);
  }
}
