export class Pixel {
  constructor({ id, type, userId, name, createdAt, visits, expiresAt, scope }) {
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
