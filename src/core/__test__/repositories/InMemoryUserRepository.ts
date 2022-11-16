import { User } from '../../entities/User';
import { UserRepository } from '../../repositories/UserRepository';
import { UpdateUserInput } from '../../usecases/user/UpdateUser';

export const userDb = new Map<string, User>();
export type UserOutput = {
  accesToken: string;
  username: string;
	email: string;
  id: string;
  password: string
}

export class InMemoryUserRepository implements UserRepository {

  async create(user: User): Promise<User> {
    userDb.set(user.props.id, user);
    return Promise.resolve(user)
  }

  async update(user: UpdateUserInput ): Promise<User> {
    const userFounded = await this.getById(user.id)  
    userFounded.update({
        profilePicture : user.profilePicture,
        username : user.username,
        connectMethod: user.connectMethod,
        password: user.password
    })
    userDb.set(userFounded.props.id, userFounded);  
    return Promise.resolve(userFounded);
  }
  
  async getById(id: string): Promise<User> {
    const user = userDb.get(id)
    if (!user) {
      throw new Error("USER NOT FOUND")
    }
    return Promise.resolve(user);
  }



  async getByEmail(email: string): Promise<User> { 
    const values = Array.from(userDb.values());
    const user = values.find(v => v.props.email === email);
    return Promise.resolve(user)
  }  
  
  async delete(id: string): Promise<string> {
    await userDb.delete(id)
    return Promise.resolve(id)
  }
}
