import { UpdateUserCmd } from './../usecases/user/UpdateUser';
import { User } from "../entities/User";

export interface UserRepository {
    create(user: User): Promise<User> 
    getByEmail(email: string): Promise<User> 
    getById(id: string): Promise<User> 
    update(user: UpdateUserCmd): Promise<User> 
}