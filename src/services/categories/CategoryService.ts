import BaseService from '@/services/BaseService';
import type { IResultObject } from '@/models/IResultObject';
import type { ICategory } from '@/models/ICategory';

export default class CategoryService extends BaseService<ICategory> {
  private static instance: CategoryService;

  private constructor() {
    super('/categories');
  }

  public static getInstance(): CategoryService {
    if (!this.instance) {
      this.instance = new CategoryService();
    }
    return this.instance;
  }

  public async getAll(): Promise<IResultObject<any>> {
    return this.request({
      method: 'GET',
      url: ''
    });
  }

  public async create(category: ICategory): Promise<IResultObject<ICategory>> {
    return this.request({
      method: 'POST',
      url: '',
      data: category
    });
  }


  public async getById(id: number): Promise<IResultObject<ICategory>> {
    return this.request({
      method: 'GET',
      url: `/${id}`
    });
  }

  public async update(id: number, category: ICategory): Promise<IResultObject<ICategory>> {
    return this.request({
      method: 'PUT',
      url: `/${id}`,
      data: category
    });
  }

  public async delete(id: number): Promise<IResultObject<ICategory>> {
    return this.request({
      method: 'DELETE',
      url: `/${id}`
    });
  }
}
