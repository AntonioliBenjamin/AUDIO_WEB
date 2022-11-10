import { User, UserProperties } from "../../core/entities/User";
import { UserRepository } from "../../core/repositories/UserRepository";

export const userDb = new Map();

export type UserOutput = {
  accesToken: string;
  username: string;
	email: string;
  id: string;
  password: string
}

export class InMemoryUserRepository implements UserRepository {
  save(user: User): void {
    userDb.set(user.props.id, user.props);
  }

  getByEmail(email: string): UserProperties { 
    const values = Array.from(userDb.values());
    const user = values.find(v => v.email === email);
    return user
  }
}
