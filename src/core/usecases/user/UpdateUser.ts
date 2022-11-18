import { EncryptionGateway } from "./../../gateways/EncryptionGateway";
import { ConnectMethod, User, UserProperties } from "./../../entities/User";
import { UserRepository } from "./../../repositories/UserRepository";
import { UseCase } from "../UseCase";

export type UpdateUserInput = {
  id: string;
  username: string;
  profilePicture: string;
  connectMethod: ConnectMethod;
  password: string;
};

export class UpdateUser implements UseCase<UpdateUserInput, UserProperties> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encryptionGateway: EncryptionGateway
  ) {}

  async execute(input: UpdateUserInput): Promise<UserProperties> {
    const user = await this.userRepository.update({
      id: input.id,
      connectMethod: input.connectMethod,
      password: this.encryptionGateway.encrypt(input.password),
      profilePicture: input.profilePicture,
      username: input.username,
    });

    return Promise.resolve(user.props);
  }
}
