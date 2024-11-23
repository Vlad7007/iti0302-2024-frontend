
import BaseService from '@/services/BaseService';
import type { IResultObject } from '@/models/IResultObject';
import type { IProduct } from '@/models/IProduct';
import type { IUserInfo } from '@/models/IUserInfo';

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

  public async getAll(criteria: any, userInfo: IUserInfo): Promise<IResultObject<IProduct[]>> {
    const response = await this.request({
      method: 'GET',
      url: '',
      params: {
        ...criteria,
        price: `${criteria.minPrice},${criteria.maxPrice}`,
        sort: `${criteria.sortBy},${criteria.sortDirection}`,
        search: criteria.name,
        page: criteria.page,
        size: criteria.size
      }
    }, userInfo);
    console.log('Response:', response);
    if ((response.data as any).content) {
      return { data: (response.data as any).content };
    } else {
      return { errors: response.errors };
    }
  }

  public async getById(id: number, userInfo: IUserInfo): Promise<IResultObject<IProduct>> {
    return this.request({
      method: 'GET',
      url: `/${id}`
    }, userInfo);
  }

  public async create(product: IProduct, userInfo: IUserInfo): Promise<IResultObject<IProduct>> {
    return this.request({
      method: 'POST',
      url: '',
      data: product
    }, userInfo);
  }

  public async update(id: number, product: IProduct, userInfo: IUserInfo): Promise<IResultObject<IProduct>> {
    return this.request({
      method: 'PUT',
      url: `/${id}`,
      data: product
    }, userInfo);
  }

  public async delete(id: number, userInfo: IUserInfo): Promise<IResultObject<IProduct>> {
    return this.request({
      method: 'DELETE',
      url: `/${id}`
    }, userInfo);
  }
}
