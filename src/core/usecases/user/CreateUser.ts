import { EncryptionGateway } from './../../gateways/EncryptionGateway';
import { UserRepository } from '../../repositories/UserRepository';
import { User } from "../../entities/User";
import { UseCase } from "../UseCase";
import { IdGateway } from '../../gateways/IdGateway';

export type UserInput = {
    username: string,
    email: string,
    password: string
    profilePicture?: string,
}

export class CreateUser implements UseCase<UserInput, User> {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly idGateway: IdGateway,
        private readonly encryptionGateway: EncryptionGateway,
        ) {}

    execute(input: UserInput): User {
        const isProfileExist = this.userRepository.getByEmail(input.email.toLocaleLowerCase().trim())    
        if (isProfileExist) {
        throw new Error("USER ALREADY EXISTS")
        }

        const user = User.create({
            id: this.idGateway.generate(),
            email: input.email,
            password: this.encryptionGateway.encrypt(input.password),
            username: input.username,
            profilePicture: input.profilePicture,    
        })
        
        this.userRepository.save(user)  
        return user;
    }
}