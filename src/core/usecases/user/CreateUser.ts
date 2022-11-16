import { EncryptionGateway } from "./../../gateways/EncryptionGateway";
import { UserRepository } from "../../repositories/UserRepository";
import { User } from "../../entities/User";
import { UseCase } from "../UseCase";
import { IdGateway } from "../../gateways/IdGateway";

export type UserInput = {
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
};

export class CreateUser implements UseCase<UserInput, User> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly idGateway: IdGateway,
    private readonly encryptionGateway: EncryptionGateway
  ) {}

  async execute(input: UserInput): Promise<User> {
    const user = User.create({
      id: this.idGateway.generate(),
      email: input.email,
      password: this.encryptionGateway.encrypt(input.password),
      username: input.username,
      profilePicture: input.profilePicture,
    });

    const result = await this.userRepository.create(user);
    return Promise.resolve(result);
  }
}
