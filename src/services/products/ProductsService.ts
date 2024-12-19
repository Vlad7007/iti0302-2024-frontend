
import BaseService from '@/services/BaseService';
import type { IResultObject } from '@/models/IResultObject';
import type { IProduct } from '@/models/IProduct';
import type { IUserInfo } from '@/models/IUserInfo';
import type { IPaginatedResponseData } from '@/models/IPaginatedResponseData'

export default class ProductsService extends BaseService<IProduct> {
  private static instance: ProductsService;

  private constructor() {
    super('/products');
  }

  public static getInstance(): ProductsService {
    if (!this.instance) {
      this.instance = new ProductsService();
    }
    return this.instance;
  }

  public async getAll(criteria: any, userInfo: IUserInfo): Promise<IPaginatedResponseData<IProduct[]>> {
    try {
      const response: IResultObject<any> = await this.request({
        method: 'GET',
        url: '',
        params: criteria,
      });

      if (response.data) {
        return this.createPaginatedResponse(response.data, response.errors);
      } else {
        return this.createPaginatedResponse({}, response.errors);
      }
    } catch (error: any) {
      console.log("Error caught in ProductService: ", error);
      return this.createPaginatedResponse({}, error.errors);
    }
  }


  private createPaginatedResponse(responseData: any, errors?: string[]): IPaginatedResponseData<IProduct[]> {
    return {
      content: responseData.content,
      number: responseData.number,
      size: responseData.size,
      totalElements: responseData.totalElements,
      totalPages: responseData.totalPages,
      errors: errors
    };
  }

  public async getById(id: number, userInfo: IUserInfo): Promise<IResultObject<IProduct>> {
    return this.request({
      method: 'GET',
      url: `/${id}`
    });
  }

  public async create(product: IProduct, userInfo: IUserInfo): Promise<IResultObject<IProduct>> {
    return this.request({
      method: 'POST',
      url: '',
      data: product
    });
  }

  public async update(id: number, product: IProduct, userInfo: IUserInfo): Promise<IResultObject<IProduct>> {
    return this.request({
      method: 'PUT',
      url: `/${id}`,
      data: product
    });
  }

  public async delete(id: number, userInfo: IUserInfo): Promise<IResultObject<IProduct>> {
    return this.request({
      method: 'DELETE',
      url: `/${id}`
    });
  }
}
