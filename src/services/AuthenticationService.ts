import type { IUserInfo } from '@/models/IUserInfo'
import BaseService from './BaseService'
import type { IResultObject } from '@/models/IResultObject'

export default class AuthenticationService extends BaseService<IUserInfo> {
  private static instance: AuthenticationService;

  private constructor() {
    super('/');
  }

  public static getInstance(): AuthenticationService {
    if (!this.instance) {
      this.instance = new AuthenticationService();
    }
    return this.instance;
  }

  public async login(username: string, password: string): Promise<IResultObject<IUserInfo>> {
    try {
      const response = await this.request({
        method: 'POST',
        url: 'login',
        data: { username, password }
      }, {} as IUserInfo);

      if (response.data) {
        const userInfo = this.handleTokenResponse(response.data);
        return { data: userInfo };
      }

      return response;
    } catch (error: any) {
      return { errors: error.errors };
    }
  }
}
