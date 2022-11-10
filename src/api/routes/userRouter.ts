import {  UpdateUser } from './../../core/usecases/user/UpdateUser';
import { UuidGateway } from './../../adapters/gateways/UuidGateway';
import { Signin } from "../../core/usecases/user/Signin";
import * as express from "express";
import { Request, Response } from "express";
import { InMemoryUserRepository } from "../../adapters/repositories/InMemoryUserRepository";
import { CreateUser } from "../../core/usecases/user/CreateUser";
import { BcryptGateway } from '../../adapters/gateways/BcryptGateway';
import { JwtGateway } from '../../adapters/gateways/JtwGateway';
import { authorization } from '../midlewares/authorization';
import { UserAuthInfoRequest } from './types/UserAuthInfoRequest ';
const router = express.Router();
const inMemoryUserRepository = new InMemoryUserRepository();
const uuidGateway = new UuidGateway()
const bcryptGateway = new BcryptGateway()
const jwtGateway = new JwtGateway(); 
const createUser = new CreateUser(inMemoryUserRepository, uuidGateway, bcryptGateway);
const userSignin = new Signin(inMemoryUserRepository, jwtGateway, bcryptGateway);
const updateUser = new UpdateUser(inMemoryUserRepository, bcryptGateway)
const map = new Map();


router.post("/", (req: Request, res: Response) => {
  try {
    const body = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      profilePicture: req.body.profilePicture
    };
    
    const user = createUser.execute(body);

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
  })
}
});

router.use(authorization)

router.patch("/", async (req: UserAuthInfoRequest, res: Response) => {
  try {  
  const body = {
    username: req.body.username,
    profilePicture: req.body.profilePicture,
    connectMethod: req.body.connectMethod,
    password: req.body.password,
  }

  const user = updateUser.execute({
    username: body.username,
    profilePicture: body.profilePicture,
    connectMethod: body.connectMethod,
    password: body.password,
    accessToken: req.user.email
  })

  return res.status(200).send({
    username: body.username,
    profilePicture: body.profilePicture,
    connectMethod: body.connectMethod,
    accessToken: req.user.email
  })
} catch (err) {
  return res.status(400).send({
    message: err.message
  })
}
})

export { router as userRouter };
