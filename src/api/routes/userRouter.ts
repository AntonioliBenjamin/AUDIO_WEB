import { MongoDbUserRepository } from './../../adapters/repositories/mongoDb/repositories/MongoDbUserRepository';
import { UpdateUser } from "./../../core/usecases/user/UpdateUser";
import { UuidGateway } from "./../../adapters/gateways/UuidGateway";
import { Signin } from "../../core/usecases/user/Signin";
import * as express from "express";
import { Request, Response } from "express";
import { CreateUser } from "../../core/usecases/user/CreateUser";
import { BcryptGateway } from "../../adapters/gateways/BcryptGateway";
import { JwtGateway } from "../../adapters/gateways/JtwGateway";
import { authorization } from "../midlewares/authorization";
import { UserAuthInfoRequest } from "./types/UserAuthInfoRequest ";
const mongoDbUserRepository = new MongoDbUserRepository()
const encryptionGateway = new BcryptGateway()
const router = express.Router();
const uuidGateway = new UuidGateway();
const bcryptGateway = new BcryptGateway();
const jwtGateway = new JwtGateway();
const createUser = new CreateUser(
 mongoDbUserRepository,
  uuidGateway,
  bcryptGateway
);
const userSignin = new Signin(
  mongoDbUserRepository,
  jwtGateway,
  bcryptGateway
);
const updateUser = new UpdateUser(mongoDbUserRepository, encryptionGateway);


router.post("/", async (req: Request, res: Response) => {
  try {
    const body = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      profilePicture: req.body.profilePicture,
    };

    const user = await createUser.execute(body);

    return res.status(200).send({
      id: user.props.id,
      username: user.props.username,
      email: user.props.email,
    });
  } catch (err) {
    return res.status(400).send({
      message: err.message,
    });
  }
});

router.post("/signin", async (req: Request, res: Response) => {
  try {
    const body = {
      email: req.body.email,
      password: req.body.password,
    };

    const user = await userSignin.execute(body);

    return res.status(200).send({
      id: user.id,
      accesToken: user.accesToken,
      email: user.email,
    });
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});

router.use(authorization);

router.patch("/", async (req: UserAuthInfoRequest, res: Response) => {

  try {
    const body = {
      username: req.body.username,
      profilePicture: req.body.profilePicture,
      connectMethod: req.body.connectMethod,
      password: req.body.password,
    };

    await updateUser.execute({
      username: body.username,
      profilePicture: body.profilePicture,
      connectMethod: body.connectMethod,
      password: body.password,
      id: req.user.id,
    });

    return res.status(200).send({
      username: body.username,
      profilePicture: body.profilePicture,
      connectMethod: body.connectMethod,
    });
    
  } catch (err) {
    return res.status(400).send({
      message: err.message,
    });
  }
});

export { router as userRouter };