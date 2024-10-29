import { PixelType } from "./Pixel.model.js";

export class PixelEntity {
  readonly id: string;
  readonly type: PixelType;
  readonly user_id: string;
  readonly name: string;
  readonly created_at: Date;
  readonly visits: number;
  readonly expires_at: Date | null;
  readonly scope: string | null;

  constructor({
    id,
    type,
    user_id,
    name,
    created_at,
    visits,
    expires_at,
    scope,
  }: {
    id: string;
    type: PixelType;
    user_id: string;
    name: string;
    created_at: Date;
    visits: number;
    expires_at: Date | null;
    scope: string | null;
  }) {
    this.id = id;
    this.type = type;
    this.user_id = user_id;
    this.name = name;
    this.created_at = created_at;
    this.visits = visits;
    this.expires_at = expires_at;
    this.scope = scope;
  }
}
