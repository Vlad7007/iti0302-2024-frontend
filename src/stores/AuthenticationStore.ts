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
    }
  }
});
