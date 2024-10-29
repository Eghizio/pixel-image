export class UserEntity {
  readonly id: string;
  readonly email: string;
  readonly password: string; // Should we retrieve password?
  readonly name: string;
  readonly created_at: Date;
  readonly last_seen_at: Date;

  constructor({
    id,
    email,
    password,
    name,
    created_at,
    last_seen_at,
  }: {
    readonly id: string;
    readonly email: string;
    readonly password: string;
    readonly name: string;
    readonly created_at: Date;
    readonly last_seen_at: Date;
  }) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.name = name;
    this.created_at = created_at;
    this.last_seen_at = last_seen_at;
  }
}
