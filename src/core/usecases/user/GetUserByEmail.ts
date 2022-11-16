import { UserRepository } from "./../../repositories/UserRepository";
import { User } from "../../entities/User";
import { UseCase } from "../UseCase";

export class GetUserByEmail implements UseCase<string, User> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(email: string): Promise<User> {
    const user = await this.userRepository.getByEmail(
      email.toLocaleLowerCase().trim()
    );
    return Promise.resolve(user);
  }
}
