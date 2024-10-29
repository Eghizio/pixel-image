import { PixelType } from "./Pixel.model.js";

export class PixelDto {
  readonly type: PixelType;
  readonly userId: string; // Should it be in DTO?
  readonly name: string;
  readonly expiresAt: Date | null;
  readonly scope: string | null;

  constructor({
    type,
    userId,
    name,
    expiresAt = null,
    scope = null,
  }: {
    type: PixelType;
    userId: string;
    name: string;
    expiresAt: Date | null;
    scope: string | null;
  }) {
    this.type = type;
    this.userId = userId;
    this.name = name;
    this.expiresAt = expiresAt;
    this.scope = scope;
  }
}
