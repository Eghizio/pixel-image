export class UserDto {
  // readonly id: string;
  readonly email: string;
  readonly password: string; // Gotta protect this if outputing.
  // readonly name: string;

  constructor({
    // id,
    email,
    password,
  }: // name,
  {
    // readonly id: string;
    readonly email: string;
    readonly password: string;
    // readonly name: string;
  }) {
    // this.id = id;
    this.email = email;
    this.password = password;
    // this.name = name;
  }
}
