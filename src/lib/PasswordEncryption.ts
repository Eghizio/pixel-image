import bcrypt from "bcrypt";

export class PasswordEncryption {
  static readonly saltRounds = 12;

  static async hash(password: string): Promise<string> {
    return bcrypt.hash(password, PasswordEncryption.saltRounds);
  }

  static async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
