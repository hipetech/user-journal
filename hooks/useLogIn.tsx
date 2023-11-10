import { useShallow } from "zustand/react/shallow";

import { useUserStore } from "@/store/userStore";

export default function () {
  const user= useUserStore(useShallow(state => state.user));
  return Boolean(user);
}
