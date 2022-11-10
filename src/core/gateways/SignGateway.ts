import { UserProperties } from "../entities/User";

export type Identity = {
    id: string,
    username: string,
    email: string
}

export type UserInputGenerateToken = {
    username: string;
    email: string;
    id: string;
}

export interface SignGateway {
    generate(user: UserInputGenerateToken): string;
    verify(headersToken : string): Identity;
}