import { UserRepository } from "../../repositories/UserRepository";
import { UseCase } from '../UseCase';
import { SignGateway } from '../../gateways/SignGateway';
import { EncryptionGateway } from '../../gateways/EncryptionGateway';

export type UserSigninInput = {
  email: string;
  password: string;
};

export type UserSigninOutput = {
  accesToken: string;
  id: string;
  email: string;
};

export class Signin implements UseCase<UserSigninInput, UserSigninOutput> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly signGateway: SignGateway,
    private readonly encryptionGateway: EncryptionGateway
    ) {}

  async execute(input: UserSigninInput): Promise<UserSigninOutput> {
    const user = this.userRepository.getByEmail(
      input.email.toLocaleLowerCase().trim()
    );
    
    if (!user) {
      throw new Error("USER NOT FOUND");
    }

    const match = await this.encryptionGateway.match(input.password, user.password);
    if (!match) {
      throw new Error("USER NOT FOUND");
    }

    const token = this.signGateway.generate(user)

    return {
      accesToken: token,
      id: user.id,
      email: user.email,
    };
  }
}