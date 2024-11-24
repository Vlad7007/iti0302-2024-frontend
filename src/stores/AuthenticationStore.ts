import type { IUserInfo } from '@/models/IUserInfo';
import { defineStore } from 'pinia'

export const useAuthenticationStore = defineStore({
  id: 'AuthenticationStore',

  state: () => ({
    userInfo: null as IUserInfo | null,
    isAuthenticated: false,
  }),
  actions: {
    setUserInfo(info: IUserInfo | null) {
      this.userInfo = info;
    },
    login(userInfo: IUserInfo) {
      this.isAuthenticated = true;
      this.setUserInfo(userInfo);
    },
    logout() {
      this.isAuthenticated = false;
      this.setUserInfo(null);
      localStorage.removeItem('authToken');
    },
    initializeAuth() {
      const token = localStorage.getItem('authToken');
      if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        this.login({
          token,
          sub: decodedToken.sub,
          role: decodedToken.role,
          userId: decodedToken.userId
        });
      }
    }
  }
});
