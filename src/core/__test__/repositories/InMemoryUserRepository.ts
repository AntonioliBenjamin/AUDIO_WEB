import { User } from '../../entities/User';
import { UserRepository } from '../../repositories/UserRepository';

export const userDb = new Map<string, User>();

export class InMemoryUserRepository implements UserRepository {
  
  getById(id: string): User {
    const user = userDb.get(id)
    if (!user) {
      throw new Error("USER NOT FOUND")
    }
    return user;
  }

  async save(user: User): Promise<void> {
    userDb.set(user.props.id, user);
  }

  getByEmail(email: string): User { 
    const values = Array.from(userDb.values());
    const user = values.find(v => v.props.email === email);
    return user
  }
}
