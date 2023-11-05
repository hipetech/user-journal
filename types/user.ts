export interface User {
  id: string;
  firstName: string;
  lastName?: string;
  permissions: Permissions;
  login: string;
  email?: string;
  password: string;
}
