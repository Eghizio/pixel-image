import type { UserEntity } from "../models/User/User.entity.js";

export interface UsersService {
  registerUser(email: string, password: string): Promise<string>;

  loginUser(email: string, password: string): Promise<string>;

  deleteUser(userId: string): Promise<void>;

  findUserByEmail(email: string): Promise<UserEntity | null>;

  findUserById(userId: string): Promise<UserEntity | null>;

  changeUsersName(name: string, userId: string): Promise<void>;

  changeUsersEmail(email: string, userId: string): Promise<void>;
}
