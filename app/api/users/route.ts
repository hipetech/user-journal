import bcrypt from "bcrypt";
import { v4 } from "uuid";

import { readJson } from "@/helpers/readJson";
import { writeJson } from "@/helpers/writeJson";
import { writeLog } from "@/helpers/writeLog";
import { LogType } from "@/types/log";
import { PostUser } from "@/types/postUser";
import { RemoveUser } from "@/types/removeUser";
import { User } from "@/types/user";
import { UserCredential } from "@/types/userCredential";

export async function GET() {
  const users = await readJson(process.env.USERS);
  return Response.json(users);
}

export async function POST(request: Request) {
  const users = (await readJson<{users: User[]}>(process.env.USERS)).users;
  const usersCredentials = (await readJson<{usersCredentials: UserCredential[]}>(process.env.CREDS)).usersCredentials;
  
  const data: PostUser = await request.json();
  const hashedPassword = await bcrypt.hash(data.newUser.password, 12);
  
  await writeJson(process.env.USERS, {users: [...users, {...data.newUser, password: hashedPassword}]});
  await writeJson(process.env.CREDS, {usersCredentials: [
    ...usersCredentials,
    {
      id: data.newUser.id,
      login: data.newUser.login,
      password: data.newUser.password,
      permissions: data.newUser.permissions
    }]
  });
  
  writeLog({
    id: v4(),
    user: data.user,
    date: new Date(),
    type: LogType.USER_ADD,
  });
  
  return Response.json(data);
}
export async function DELETE(request: Request) {
  const users = (await readJson<{users: User[]}>(process.env.USERS)).users;
  const usersCredentials = (await readJson<{usersCredentials: UserCredential[]}>(process.env.CREDS)).usersCredentials;
  
  const data: RemoveUser = await request.json();
  
  await writeJson(process.env.USERS, {
    users: users.filter((user) => user.id !== data.removeUserId)
  });
  await writeJson(process.env.CREDS, {
    usersCredentials: usersCredentials.filter((cred) => cred.id !== data.removeUserId)
  });
  
  writeLog({
    id: v4(),
    user: data.user,
    date: new Date(),
    type: LogType.USER_REMOVE,
  });
  return Response.json(data);
}
