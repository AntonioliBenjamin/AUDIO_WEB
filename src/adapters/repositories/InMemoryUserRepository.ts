import { User, UserProperties } from "../../core/entities/User";
import { UserRepository } from "../../core/repositories/UserRepository";

export const userDb = new Map();

export class InMemoryUserRepository implements UserRepository {
  save(user: User): void {
    userDb.set(user.props.email, user.props);
  }

  getByEmail(email: string): UserProperties {
    return userDb.get(email);
  }

  checkAccountExist(email: string, password: string): boolean { 
    const values = Array.from(userDb.values());
    const match = values.find(v => v.email === email && v.password === password);
    if (!match) {
      throw new Error('CANNOT FIND ACCOUNT')
    }
    return true
  }
}
