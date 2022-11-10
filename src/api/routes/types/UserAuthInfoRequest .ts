import { Request } from "express";

export type UserAuthInfoRequestProperties = {
    uid: string,
    email: string,
    username: string
}
export interface UserAuthInfoRequest extends Request {
  user: UserAuthInfoRequestProperties;
}