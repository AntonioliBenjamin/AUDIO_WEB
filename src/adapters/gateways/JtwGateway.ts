import { Identity, SignGateway } from "../../core/gateways/SignGateway";
import jwt = require("jsonwebtoken");
import { UserSigninOutput } from "../../core/usecases/user/Signin";
const secretKey = "process.env.SECRET_KEY ";

export class JwtGateway implements SignGateway {
  
  verify(headersToken: string): Identity {
    const decodedUserToken = jwt.verify(headersToken, secretKey) as any 
    return {
      id: decodedUserToken.id,
      email: decodedUserToken.email,
      username: decodedUserToken.username,
    }
  }

  generate(user: UserSigninOutput): string {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username
      },
      secretKey
    );

    return token;
  }
}

