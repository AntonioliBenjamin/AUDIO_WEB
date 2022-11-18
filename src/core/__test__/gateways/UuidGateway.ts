import { v4 as uuidv4 } from "uuid";
import { IdGateway } from "../../gateways/IdGateway";



export class UuidGateway implements IdGateway{
    generate(): string {
        return uuidv4()
    }  
}