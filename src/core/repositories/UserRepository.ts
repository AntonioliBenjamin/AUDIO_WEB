import { User } from "../entities/User";

export interface UserRepository {
    save(user: User): void
    getByEmail(email: string): User
    getById(id: string): User
}