export class PixelEntity {
  constructor({
    id,
    type,
    user_id,
    name,
    created_at,
    visits,
    expires_at,
    scope,
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
