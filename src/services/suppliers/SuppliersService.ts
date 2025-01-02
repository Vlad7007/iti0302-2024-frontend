import BaseService from '@/services/BaseService'
import type { ISupplier } from '@/models/ISupplier'
import type { IResultObject } from '@/models/IResultObject'

export default class SuppliersService extends BaseService<ISupplier> {
  private static instance: SuppliersService;

  private constructor() {
    super('/suppliers');
  }

  public static getInstance(): SuppliersService {
    if (!this.instance) {
      this.instance = new SuppliersService();
    }
    return this.instance;
  }

  public async getAll(): Promise<IResultObject<any>> {
    return this.request({
      method: 'GET',
      url: ''
    });
  }

  public async create(supplier: ISupplier): Promise<IResultObject<ISupplier>> {
    return this.request({
      method: 'POST',
      url: '',
      data: supplier
    });
  }


  public async getById(id: number): Promise<IResultObject<ISupplier>> {
    return this.request({
      method: 'GET',
      url: `/${id}`
    });
  }

  public async update(id: number, supplier: ISupplier): Promise<IResultObject<ISupplier>> {
    return this.request({
      method: 'PUT',
      url: `/${id}`,
      data: supplier
    });
  }

  public async delete(id: number): Promise<IResultObject<ISupplier>> {
    return this.request({
      method: 'DELETE',
      url: `/${id}`
    });
  }
}
