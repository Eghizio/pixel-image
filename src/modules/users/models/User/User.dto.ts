import { UserEntity } from "./User.entity.js";

export class UserRequestDto {
  readonly email: string;
  readonly password: string;

  constructor({ email, password }: { email: string; password: string }) {
    this.email = email;
    this.password = password;
  }
}

export class UserResponseDto {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly createdAt: Date;

  constructor({
    id,
    email,
    name,
    createdAt,
  }: {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
  }) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.createdAt = createdAt;
  }

  static fromEntity({ id, email, name, created_at }: UserEntity) {
    return new UserResponseDto({ id, email, name, createdAt: created_at });
  }
}
