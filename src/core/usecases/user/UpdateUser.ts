import { ConnectMethod, User, UserProperties } from "./../../entities/User";
import { UserRepository } from "./../../repositories/UserRepository";
import { UseCase } from "../UseCase";

export type UpdateUserCmd = {
  id: string;
  username: string;
  profilePicture: string;
  connectMethod: ConnectMethod;
  password: string;
};

export class UpdateUser implements UseCase<UpdateUserCmd, UserProperties> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: UpdateUserCmd): Promise<UserProperties> {
    const user = await this.userRepository.update(input);

    return Promise.resolve(user.props);
  }
}
