import { UserRepository } from './../../repositories/UserRepository';
import { UseCase } from "../UseCase";

export class DeleteUser implements UseCase<string, Promise<string>> {
    constructor(
        private readonly userRepository: UserRepository
    ){}
    
    execute(id: string): Promise<string>  {
        this.userRepository.delete(id)
        return Promise.resolve(id)
    }


}