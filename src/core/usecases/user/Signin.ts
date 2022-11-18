import { UserRepository } from "../../repositories/UserRepository";
import { UseCase } from "../UseCase";
import { SignGateway } from "../../gateways/SignGateway";
import { EncryptionGateway } from "../../gateways/EncryptionGateway";

export type UserSigninInput = {
  email: string;
  password: string;
};

export type UserSigninOutput = {
  accesToken: string;
  username: string;
	email: string;
  id: string;
};

export class Signin implements UseCase<UserSigninInput, UserSigninOutput> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly signGateway: SignGateway,
    private readonly encryptionGateway: EncryptionGateway
  ) {}

  async execute(input: UserSigninInput): Promise<UserSigninOutput> {

    const user = await this.userRepository.getByEmail(input.email.toLowerCase())

    if (!user) {
      throw new Error('CANNOT FIND ACCOUNT')
    }
    const match = await this.encryptionGateway.match(
      input.password,
      user.props.password
    );
    if (!match) {
      throw new Error("USER NOT FOUND");
    }

    const token = this.signGateway.generate(user.props);

    return {
      id: user.props.id,
      accesToken: token,
      username: user.props.username,
      email: user.props.email,
    };
  }
}