export interface IManageUsers {
  id: bigint;
  username: string;
  email: string;
  role: 'ROLE_USER' | 'ROLE_MANAGER' | 'ROLE_ADMIN';
}
