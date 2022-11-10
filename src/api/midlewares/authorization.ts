import { JwtGateway } from "../../adapters/gateways/JtwGateway";
const jwtGateway = new JwtGateway() 

export function authorization(req, res, next)  {
    const headers = {
      token: req.headers.token,
    };
    try {
      const decodedUserToken = jwtGateway.verify(headers.token);
      req.user = decodedUserToken;
      return next();
    } catch (err) {
      return res.sendStatus(401);    
    }
  };