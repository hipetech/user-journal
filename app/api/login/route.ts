import bcrypt from "bcrypt";
import { v4 } from "uuid";

import { readJson } from "@/helpers/readJson";
import { writeLog } from "@/helpers/writeLog";
import { LogType } from "@/types/log";
import { Login } from "@/types/login";
import { LoginResponse } from "@/types/loginResponse";
import { User } from "@/types/user";

export async function POST(request: Request) {
  const users = (await readJson<{users: User[]}>(process.env.USERS)).users;
  
  const loginDTO: Login = await request.json();
  
  if (loginDTO.login && loginDTO.password) {
    const user = users.find((user: User) => user.login === loginDTO.login);
    if (user) {
      const isValid = await bcrypt.compare(loginDTO.password, user.password);
      if (isValid) {
        writeLog({
          id: v4(),
          user: user,
          date: new Date(),
          type: LogType.LOGIN,
        });
        return Response.json({user} as LoginResponse);
      }
      else return Response.json({error: "invalid password"} as LoginResponse);
    }
    return Response.json({error: "invalid login"} as LoginResponse);
  }
}
