
import BaseService from '@/services/BaseService';
import type { IResultObject } from '@/models/IResultObject';
import type { IProduct } from '@/models/IProduct';
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

  public async getAll(criteria: any): Promise<IPaginatedResponseData<IProduct[]>> {
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

  public async getById(id: number): Promise<IResultObject<IProduct>> {
    return this.request({
      method: 'GET',
      url: `/${id}`
    });
  }

  public async create(product: IProduct): Promise<IResultObject<IProduct>> {
    return this.request({
      method: 'POST',
      url: '',
      data: product
    });
  }

  public async update(id: number, product: IProduct): Promise<IResultObject<IProduct>> {
    return this.request({
      method: 'PUT',
      url: `/${id}`,
      data: product
    });
  }

  public async delete(id: number): Promise<IResultObject<IProduct>> {
    return this.request({
      method: 'DELETE',
      url: `/${id}`
    });
  }
}
