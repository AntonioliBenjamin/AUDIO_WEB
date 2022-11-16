import { UpdateUserInput } from "./../../../../core/usecases/user/UpdateUser";
import {
  UserProperties,
  ConnectMethod,
} from "./../../../../core/entities/User";
import { User } from "../../../../core/entities/User";
import { UserRepository } from "../../../../core/repositories/UserRepository";
import { UserModel } from "../models/user";

export class MongoDbUserRepository implements UserRepository {
  async create(user: User): Promise<User> {
    const userModel = new UserModel(user.props);
    userModel.save().then(() => console.log("Saved"));
    return Promise.resolve(user);
  }

  async getByEmail(email: string): Promise<User> {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return null;
    }
    const userProperties: UserProperties = {
      id: user.id,
      username: user.username,
      email: user.email,
      connectMethod: ConnectMethod.email,
      password: user.password,
      profilePicture: "",
      createdAt: user.createdAt,
      confirmedAt: user.confirmedAt,
    };
    const foundedUser = new User(userProperties);
    return Promise.resolve(foundedUser);
  }

  async getById(id: string): Promise<User> {
    const user = await UserModel.findOne({ id: id });

    if (!user) {
      throw new Error("USER NOT FOUND");
    }
    const userProperties: UserProperties = {
      id: user.id,
      username: user.id,
      email: user.email,
      connectMethod: ConnectMethod.email,
      password: user.password,
      profilePicture: "",
      createdAt: user.createdAt,
      confirmedAt: user.confirmedAt,
    };
    return new User(userProperties);
  }

  async update(user: UpdateUserInput): Promise<User> {
    await UserModel.findOneAndUpdate(
      {
        id: user.id,
      },
      {
        username: user.username,
        password: user.password,
        connectMethod: user.connectMethod,
        profilePicture: user.profilePicture,
      },
      {
        upsert: false,
      }
    );
    const result = await this.getById(user.id);
    return Promise.resolve(result);
  }

  async delete(id: string): Promise<string> {
    UserModel.deleteOne({ id: id });
    return Promise.resolve(id)
  }
}
