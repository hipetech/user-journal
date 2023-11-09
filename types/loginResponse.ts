import { User } from "@/types/user";

export interface LoginResponse {
  user?: User;
  error?: string;
}
