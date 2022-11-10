import { ConnectMethod, User, UserProperties } from './../../entities/User';
import { UserRepository } from './../../repositories/UserRepository';
import { UseCase } from "../UseCase";
import { EncryptionGateway } from '../../gateways/EncryptionGateway';

export type UserInput = {
username: string,
profilePicture: string
connectMethod: ConnectMethod,
password: string,
accessToken: string
}

export class UpdateUser implements UseCase<UserInput, UserProperties> {

    constructor
    (
        private readonly userRepository: UserRepository,
        private readonly encryptionGateway: EncryptionGateway,
    ) {}

    execute(input: UserInput): UserProperties {
    const getUser = this.userRepository.getById(input.accessToken)

    const user = new User(getUser)
    const updatedUser = user.update({
        profilePicture : input.profilePicture,
        username : input.username,
        connectMethod: input.connectMethod,
        password: this.encryptionGateway.encrypt(input.password)
    })
    this.userRepository.save(updatedUser)
        return updatedUser.props   
    }
}