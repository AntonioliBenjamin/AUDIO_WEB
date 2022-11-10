import { User, UserProperties } from "../entities/User";

export interface UserRepository {
    save(user: User): void
    getByEmail(email: string): UserProperties
    getById(id: string): UserProperties
}