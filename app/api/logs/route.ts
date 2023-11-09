import { readJson } from "@/helpers/readJson";
import { writeLog } from "@/helpers/writeLog";
import { Log } from "@/types/log";

export async function GET() {
  const logs = await readJson<{logs: Log[]}>(process.env.LOGS);
  return Response.json(logs);
}

export async function POST(request: Request) {
  const logDTO: Log = await request.json();
  writeLog(logDTO);
  return Response.json(logDTO);
}
