import { ConnectMethod, User } from "../entities/User";
import { GetUserByEmail } from "../usecases/user/GetUserByEmail";
import {
  InMemoryUserRepository,
  userDb,
} from "./repositories/InMemoryUserRepository";

const inMemoryUserRepository = new InMemoryUserRepository();
const getUserByEmail = new GetUserByEmail(inMemoryUserRepository);

describe("Unit - GetUserByEmail", () => {
  let user: User;
  beforeAll(() => {
    user = new User({
      id: "12345",
      username: "pepito",
      email: "pepito@gmail.com",
      connectMethod: ConnectMethod.email,
      password: "98765",
      profilePicture: "url:http://....",
      createdAt: null,
      confirmedAt: null,
    });
    userDb.set(user.props.id, user);
  });

  it("shoul return an user", async () => {
    const result = await getUserByEmail.execute("pepito@gmail.com");
    expect(result.props.id).toEqual("12345");
    expect(result.props.username).toEqual("pepito");
    expect(result.props.password).toEqual("98765");
  });
});
