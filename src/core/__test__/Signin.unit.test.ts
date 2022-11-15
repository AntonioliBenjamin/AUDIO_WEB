import {
  InMemoryUserRepository,
  userDb,
} from "./repositories/InMemoryUserRepository";
import { Signin } from "../usecases/user/Signin";
import { BcryptGateway } from "./gateways/BcryptGateway";
import { JwtGateway } from "./gateways/JtwGateway";
import { ConnectMethod, User } from "../entities/User";

const signGateway = new JwtGateway();
const encryptionGateway = new BcryptGateway();
const inMemoryUserRepository = new InMemoryUserRepository();
const signin = new Signin(
  inMemoryUserRepository,
  signGateway,
  encryptionGateway
);


//const EncryptedPassword = encryptionGateway.encrypt("12345")

describe("Unit - Signin", () => {
  let user : User;

  beforeAll( () => {
  user = new User({
            id: "12345",
            username: "pepito",
            email: "pepito@gmail.com",
            connectMethod: ConnectMethod.email,
            password: "$2b$10$aqkFXVlMaaH4TEWJkeE1S.X/rBDUoI0ddysGZHLJVQI5qpkR7A3ui",
            profilePicture: "url:http://....",
            createdAt: null,
            confirmedAt: null,
    });
  userDb.set(user.props.id, user);
  })

    it("should connect pepito with the good password", async () => {
        const result = await signin.execute({
            email: "pepito@gmail.com",
            password: "12345",
        })
        expect(result.email).toEqual("pepito@gmail.com");
        expect(result.id.length).toBeGreaterThan(0)
    })
 
    it("should throw with the wrong password", () => {
    const result = signin.execute({
      email: user.props.email,
      password: "badPassword",
    });
    expect(result).rejects.toThrow();
  })

    it("should throw with the wrong email", () => {
        const result = signin.execute({
          email: "badEmail@gmail.com",
          password: user.props.password
        })
        expect(result).rejects.toThrow();
    })
});
