import type { IUserInfo } from '@/models/IUserInfo'
import BaseService from './BaseService'
import type { IResultObject } from '@/models/IResultObject'

export default class AuthenticationService extends BaseService<IUserInfo> {
  private static instance: AuthenticationService;

  private constructor() {
    super('/auth/');
  }

  public static getInstance(): AuthenticationService {
    if (!AuthenticationService.instance) {
      AuthenticationService.instance = new AuthenticationService();
    }
    return AuthenticationService.instance;
  }

  public async login(username: string, password: string): Promise<IResultObject<IUserInfo>> {
    try {
      const response = await this.request({
        method: 'POST',
        url: 'login',
        data: { username, password }
      },true);

      if (response.data) {
        const userInfo = this.handleTokenResponse(response.data);
        return { data: userInfo };
      }

      return response;
    } catch (error: any) {
      return { errors: error.errors };
    }
  }

  public async logout(): Promise<IResultObject<IUserInfo>> {
    try {
      await this.request({
        method: 'POST',
        url: 'logout',
      }, false);

      return { data: null };
    } catch (error: any) {
      return { errors: error.errors };
    }
  }
}
