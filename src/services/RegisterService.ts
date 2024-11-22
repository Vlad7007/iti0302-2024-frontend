import type { IResultObject } from '@/models/IResultObject';
import type { IUserInfo } from '@/models/IUserInfo';
import axios from 'axios';
import BaseService from '@/services/BaseService'


export default class RegisterService extends BaseService<IUserInfo> {
  private static instance: RegisterService;
  private readonly baseUrl = 'http://localhost:8080/api/auth/';

  private constructor() {
    super('/');
  }

  public static getInstance(): RegisterService {
    if (!this.instance) {
      this.instance = new RegisterService();
    }
    return this.instance;
  }

  public async register(username: string, email: string, password: string): Promise<IResultObject<IUserInfo>> {
    try {
      const response = await this.request({
        method: 'POST',
        url: 'register',
        data: { username, email, password }
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

