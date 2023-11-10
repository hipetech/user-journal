import { useShallow } from "zustand/react/shallow";

import { useUserStore } from "@/store/userStore";
import { Permission } from "@/types/permission";
import { User } from "@/types/user";

function checkPermissions(permission: Permission, user: User | null) {
  if (user) {
    return user.permissions.includes(permission);
  }
  return false;
}

export default function () {
  const user = useUserStore(useShallow(state => state.user));
  return (permission: Permission) => checkPermissions(permission, user);
}
