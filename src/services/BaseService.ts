import type { IResultObject } from "@/models/IResultObject";
import type { IUserInfo } from "@/models/IUserInfo";
import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";

export default class BaseService<T> {
  protected httpClient: AxiosInstance;

  constructor(baseURL: string) {
    baseURL = '/api' + baseURL;
    this.httpClient = axios.create({ baseURL });
  }

  protected async request(config: AxiosRequestConfig, skipToken = false): Promise<IResultObject<T>> {
    try {
      const headers = { ...config.headers } as { [key: string]: string };
      if (!skipToken) {
        const token = localStorage.getItem('authToken');
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }
      }

      const response = await this.httpClient.request<T>({
        ...config,
        headers
      });
      return { data: response.data };
    } catch (error: any) {

      console.error('Request failed:', {
        message: error.message,
        status: error.response?.status,
        url: config.url,
        data: error.response?.data
      });

      const errors = error.response?.data ? Object.values(error.response.data) : [error.message];
      return { errors };
    }
  }

  protected handleTokenResponse(responseData: any): IUserInfo {
    const token = responseData.token;
    localStorage.setItem('authToken', token);

    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return {
      token,
      sub: decodedToken.sub,
      role: decodedToken.role,
      userId: decodedToken.userId
    };
  }
}
