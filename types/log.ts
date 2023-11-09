import { User } from "@/types/user";

export enum LogType {
  LOGIN= "Log in",
  LOGOUT = "Log out",
  USER_ADD = "User add",
  USER_REMOVE = "User remove",
  USER_EDIT = "User edit"
}

export interface Log {
  id: string;
  user: User;
  date: Date;
  type: LogType;
}
