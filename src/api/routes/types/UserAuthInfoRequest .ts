import { Request } from "express";

export type UserAuthInfoRequestProperties = {
    id: string,
    email: string,
    username: string
}
export interface UserAuthInfoRequest extends Request {
  user: UserAuthInfoRequestProperties;
}