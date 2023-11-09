import { v4 } from "uuid";

import { useUserStore } from "@/store/userStore";
import { LogType } from "@/types/log";

export function postLog(logType: LogType) {
  const user = useUserStore.getState().user;
  if (user) {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/logs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: v4(),
        user: user,
        date: new Date(),
        type: logType
      })
    })
      .then((res) => console.log(res));
  }
}
