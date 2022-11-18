import * as bcrypt from "bcrypt";
import { EncryptionGateway } from "../../gateways/EncryptionGateway";

const saltRounds = 10;

export class BcryptGateway implements EncryptionGateway {

   async match(password: string, userHashedPassword: string): Promise<boolean> {
    const match =  await bcrypt.compare(password, userHashedPassword);
    return match
  }

  encrypt(password: string): string {
    const hashPassword = bcrypt.hashSync(password, saltRounds);
    return hashPassword;
  }
}
