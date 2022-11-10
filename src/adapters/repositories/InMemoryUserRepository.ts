import { User, UserProperties } from "../../core/entities/User";
import { UserRepository } from "../../core/repositories/UserRepository";

export const userDb = new Map<string, User>();

export type UserOutput = {
  accesToken: string;
  username: string;
	email: string;
  id: string;
  password: string
}

export class InMemoryUserRepositorypository implements UserRepository {
  
  getById(id: string): User {
    return userDb.get(id);
  }

  save(user: User): void {
    userDb.set(user.props.id, user);
  }

  getByEmail(email: string): User { 
    const values = Array.from(userDb.values());
    const user = values.find(v => v.props.email === email);
    return user
  }
}
