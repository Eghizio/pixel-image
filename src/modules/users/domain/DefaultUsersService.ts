import type { UsersService } from "./UsersService.interface.js";
import type { UsersRepository } from "./UsersRepository.interface.js";
import { PasswordEncryption } from "../../../lib/PasswordEncryption.js";
import { IdGenerator } from "../../../lib/IdGenerator.js";
import { UserAlreadyExists } from "../errors/UserAlreadyExists.js";
import { UserEntity } from "../models/User/User.entity.js";
import { InvalidCredentials } from "../errors/InvalidCredentials.js";
import { JWT } from "../../../lib/JWT.js";

export class DefaultUsersService implements UsersService {
  constructor(private repository: UsersRepository) {}

  async registerUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.findUserByEmail(email);
    if (user !== null) throw new UserAlreadyExists();

    const userId = IdGenerator.generate();
    const hashedPassword = await PasswordEncryption.hash(password);

    await this.repository.insertUser(userId, email, hashedPassword, email);
    const registeredUser = await this.findUserById(userId);

    if (registeredUser === null) throw new Error("Dupa"); // todo adjust

    return registeredUser; // Change to Domain model instead of Entity.
  }

  async loginUser(email: string, password: string): Promise<string> {
    const user = await this.findUserByEmail(email);
    if (user === null) throw new InvalidCredentials();

    const isCorrectPassword = await PasswordEncryption.compare(
      password,
      user.password
    );

    if (!isCorrectPassword) throw new InvalidCredentials(); // Handle

    this.repository.updateUserLastSeenAt(user.id);

    const tokenData = { id: user.id };

    // Should the Service sign the JWT? Or should the Controller? Just return userId?
    const token = await JWT.sign(tokenData);

    return token;
  }

  async deleteUser(userId: string) {
    // this.repository...
  }

  async findUserByEmail(email: string) {
    // @ts-ignore // Todo: Fix
    const [user] = await this.repository.getUserByEmail(email);

    return user === undefined ? null : new UserEntity(user);
  }

  async findUserById(userId: string) {
    // @ts-ignore // Todo: Fix
    const [user] = await this.repository.getUserById(userId);

    return user === undefined ? null : new UserEntity(user);
  }

  async changeUsersName(name: string, userId: string) {
    await this.repository.updateUserNameById(name, userId);
  }

  async changeUsersEmail(email: string, userId: string) {
    await this.repository.updateUserEmailById(email, userId);
  }
}
