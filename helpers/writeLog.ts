import { readJson } from "@/helpers/readJson";
import { writeJson } from "@/helpers/writeJson";
import { Log } from "@/types/log";

export function writeLog(log: Log) {
  readJson<{logs: Log[]}>(process.env.LOGS)
    .then((data) => {
      void writeJson<{logs: Log[]}>(process.env.LOGS, {logs: [...data.logs, log]});
    });
}
