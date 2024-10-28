export class PixelDto {
  // Todo: Validation
  constructor({ type, userId, name, expiresAt = null, scope = null }) {
    this.type = type;
    this.userId = userId; // Should it be in DTO?
    this.name = name;
    this.expiresAt = expiresAt;
    this.scope = scope;
  }
}
