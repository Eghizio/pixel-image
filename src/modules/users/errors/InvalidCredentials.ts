export class InvalidCredentials extends Error {
  constructor() {
    super("Credentials are invalid.");
  }
}
