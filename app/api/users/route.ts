import { readJson } from "@/helpers/readJson";

export async function GET() {
  const users = await readJson(process.env.USERS);
  return Response.json(users);
}
