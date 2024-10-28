export type PixelType = "GLOBAL" | "SCOPED";

export class Pixel {
  readonly id: string;
  readonly type: PixelType;
  readonly userId: string;
  readonly name: string;
  readonly createdAt: Date;
  readonly visits: number;
  readonly expiresAt: Date | null;
  readonly scope: string | null;

  constructor({
    id,
    type,
    userId,
    name,
    createdAt,
    visits,
    expiresAt,
    scope,
  }: {
    id: string;
    type: PixelType;
    userId: string;
    name: string;
    createdAt: Date;
    visits: number;
    expiresAt: Date | null;
    scope: string | null;
  }) {
    this.id = id;
    this.type = type;
    this.userId = userId;
    this.name = name;
    this.createdAt = createdAt;
    this.visits = visits;
    this.expiresAt = expiresAt;
    this.scope = scope;
  }
}
