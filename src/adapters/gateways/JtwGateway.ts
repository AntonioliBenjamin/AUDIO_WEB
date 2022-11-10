import { UserProperties } from "../../core/entities/User";
import { Identity, SignGateway } from "../../core/gateways/SignGateway";
import jwt = require("jsonwebtoken");
const secretKey = "process.env.SECRET_KEY ";

export class JwtGateway implements SignGateway {
  
  verify(headersToken: string): Identity {
    const decodedUserToken = jwt.verify(headersToken, secretKey) as any 
    return {
      uid: decodedUserToken.uid,
      email: decodedUserToken.email,
      username: decodedUserToken.username,
    }
  }

  generate(user: UserProperties): string {
    const token = jwt.sign(
      {
        uid: user.id,
        email: user.email,
        username: user.username
      },
      secretKey
    );

    return token;
  }
}
