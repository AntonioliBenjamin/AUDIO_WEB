import { ConnectMethod, User } from "../entities/User";
import { UpdateUser } from "../usecases/user/UpdateUser";
import { BcryptGateway } from "./gateways/BcryptGateway";
import {
  InMemoryUserRepository,
  userDb,
} from "./repositories/InMemoryUserRepository";

const encryptionGateway = new BcryptGateway();
const inMemoryUserRepository = new InMemoryUserRepository();
const updateUser = new UpdateUser(inMemoryUserRepository, encryptionGateway);

describe("Unit - UpdateUser", () => {
  let user: User;
  beforeAll(() => {
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
  });

  it("should update the user", async () => {
    const result = await updateUser.execute({
      username: "michel",
      profilePicture: "url://michel...",
      connectMethod: ConnectMethod.email,
      password: "789456",
      id: "12345",
    });
    expect(result.username).toEqual("michel");
    expect(result.profilePicture).toEqual("url://michel...");
    expect(result.connectMethod).toEqual("email");
    expect(result.password).not.toEqual("789456");
    expect(result.createdAt).toEqual(null);
    expect(result.confirmedAt).toEqual(null);
    expect(result.id).toEqual("12345");
  });

  it("should throw USER NOT FOUND", () => {
    const result = () =>
      updateUser.execute({
        username: "michel",
        profilePicture: "url://michel...",
        connectMethod: ConnectMethod.email,
        password: "789456",
        id: "456854",
      });
    expect(async () => {
      await result();
    }).rejects.toThrow();
  });
});
