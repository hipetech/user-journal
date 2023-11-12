import { Permission } from "@/types/permission";
import { User } from "@/types/user";

export function checkPermissions(permission: Permission, user: User | null) {
  if (user) {
    return user.permissions.includes(permission);
  }
  return false;
}
