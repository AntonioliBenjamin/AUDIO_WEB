import { BcryptGateway } from "./gateways/BcryptGateway";
import { UuidGateway } from "./gateways/UuidGateway";
import { CreateUser } from "../usecases/user/CreateUser";
import { InMemoryUserRepository, userDb } from "./repositories/InMemoryUserRepository";
import { ConnectMethod, User } from "../entities/User";
const idGateway = new UuidGateway();
const encryptionGateway = new BcryptGateway();
const inMemoryUserRepository = new InMemoryUserRepository();
const createUser = new CreateUser(
  inMemoryUserRepository,
  idGateway,
  encryptionGateway
);

describe("Unit - CreateUser", () => {

  let user : User;
  beforeAll(() => {
    user = new User({
      id: "12345",
      username: "pepito",
      email: "pepito@gmail.com",
      connectMethod: ConnectMethod.email,
      password: "122345",
      profilePicture: "url:http://....",
      createdAt: null,
      confirmedAt: null,
    })
    userDb.set(user.props.id, user);
  })
  
  it("should create an user", async () => {
    const result = await createUser.execute({
      username: "newUser",
      email: "newEmail@gmail.com",
      password: "122345",
      profilePicture: "url:http://....",
    });
    expect(result.props.id).toBeTruthy();
    expect(result.props.username).toEqual("newUser");
    expect(result.props.email).toEqual("newemail@gmail.com");
    expect(result.props.password).not.toEqual("122345");
    //   Crée methode decrypt --> expect(encryptionGateway.)
    expect(result.props.createdAt).toBeTruthy();
  });

  // it("should not create an user ", () => {
  //   // const email = "pepito@gmail.com";
  //   // const user = new User({
  //   //   id: "12345",
  //   //   username: "pepito",
  //   //   email: email,
  //   //   connectMethod: ConnectMethod.email,
  //   //   password: "122345",
  //   //   profilePicture: "url:http://....",
  //   //   createdAt: null,
  //   //   confirmedAt: null,
  //   // });
  //   // await inMemoryUserRepository.create(user);

  //   const result = () =>
  //     createUser.execute({
  //       username: "pepito",
  //       email: "pepito@gmail.com",
  //       password: "122345",
  //       profilePicture: "url:http://....",
  //     });
  //     expect(async () => {
  //       await result()
  //    }).rejects.toThrow()
  // });
});
