import { UserProperties } from "../entities/User";

export type Identity = {
    uid: string,
    username: string,
    email: string
}

export interface SignGateway {
    generate(user: UserProperties): string;
    verify(headersToken : string): Identity;
}