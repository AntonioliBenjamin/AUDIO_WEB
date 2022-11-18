import { ConnectMethod, User } from './../entities/User';
import { DeleteUser } from './../usecases/user/DeleteUser';
import { InMemoryUserRepository, userDb } from "./repositories/InMemoryUserRepository";

const inMemoryUserRepository = new InMemoryUserRepository();
const deleteUser = new DeleteUser(inMemoryUserRepository);

describe("Unit - DeleteUser", () => {
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

    it("should delete a user and return id of deleted user", async () => {
        console.log(user)
        const result = await deleteUser.execute("12345");
        expect(result).toEqual("12345")
        expect(userDb.get("12345")).toEqual(undefined)
    })
})