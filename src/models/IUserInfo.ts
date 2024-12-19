export interface IUserInfo {
  token: string;
  sub: string; // username
  role: 'ROLE_USER' | 'ROLE_MANAGER' | 'ROLE_ADMIN';
  userId: number;
  content?: any;
}
