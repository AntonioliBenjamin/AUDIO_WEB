import { BcryptGateway } from './gateways/BcryptGateway';
import { UuidGateway } from './gateways/UuidGateway';
import { CreateUser } from "../usecases/user/CreateUser"
import { InMemoryUserRepository, userDb } from './repositories/InMemoryUserRepository';
import { ConnectMethod, User } from '../entities/User';

const idGateway = new UuidGateway()
const encryptionGateway = new BcryptGateway()
const inMemoryUserRepository = new InMemoryUserRepository()
const createUser = new CreateUser(inMemoryUserRepository, idGateway, encryptionGateway)



describe('Unit - CreateUser', () => {
    it('should create an user', () => {
        const result = createUser.execute({
            username: "newUser",
            email: "newEmail@gmail.com",
            password: "122345",
            profilePicture: "url:http://...."
        });
        expect(result.props.id).toBeTruthy();
        expect(result.props.username).toEqual('newUser');
        expect(result.props.email).toEqual('newemail@gmail.com');
        expect(result.props.password).not.toEqual('122345');
        //   Crée methode decrypt --> expect(encryptionGateway.)
        expect(result.props.createdAt).toBeTruthy();
    })

    it('should throw USER NOT FOUND', () => {

        userDb.set("12345", new User({
            id: "12345",
            username: "pepito",
            email: "pepito@gmail.com",
            connectMethod: ConnectMethod.email,
            password: "$2b$10$xGVB4YHJ9K/8/NpWQWwuv.Zjut0xmeQOMHh5z2d6DCAiwf5hsVOsi",
            profilePicture: "url:http://....",
            createdAt: null,
            confirmedAt: null,
        }));
        
        const result = () => createUser.execute({
            username: "pepito",
            email: "pepito@gmail.com",
            password: "122345",
            profilePicture: "url:http://...."
        });
        expect(() => {
            result()
        }).toThrow()
    })
})