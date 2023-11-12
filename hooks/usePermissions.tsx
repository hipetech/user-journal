import { useShallow } from "zustand/react/shallow";

import { checkPermissions } from "@/helpers/checkPermissions";
import { useUserStore } from "@/store/userStore";
import { Permission } from "@/types/permission";

export default function () {
  const user = useUserStore(useShallow(state => state.user));
  return (permission: Permission) => checkPermissions(permission, user);
}
