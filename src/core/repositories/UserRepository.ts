import { UserProperties } from './../entities/User';
import { User } from "../entities/User";

export interface UserRepository {
    save(user: User): void
    getByEmail(email: string): UserProperties
    checkAccountExist(email: string, password: string): boolean
}