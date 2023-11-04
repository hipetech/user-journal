import { Permission } from "@/types/permission";

type PermissionsValue = Permission | "-";
export type Permissions = [PermissionsValue, PermissionsValue, PermissionsValue];
