// Todo: Return Entities.
export interface UsersRepository {
  insertUser(
    id: string,
    email: string,
    password: string,
    name: string
  ): Promise<any>;

  getUserByEmail(email: string): Promise<any>;

  getUserById(id: string): Promise<any>;

  updateUserNameById(name: string, id: string): Promise<any>;

  updateUserEmailById(email: string, id: string): Promise<any>;
}
