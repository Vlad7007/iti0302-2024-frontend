import BaseService from './BaseService'
import type { IResultObject } from '@/models/IResultObject'
import type { IManageUsers } from '@/models/IManageUsers'

class AdminService extends BaseService<IManageUsers> {
  constructor() {
    super('/admin/users')
  }

  async getAllUsers(): Promise<IResultObject<any>> {
    return this.request({
      method: 'GET',
      url: ''
    }, false)
  }

  async getUserById(id: bigint): Promise<IResultObject<IManageUsers>> {
    return this.request({
      method: 'GET',
      url: `/${id}`
    },false)
  }

  async updateUser(id: bigint, user: IManageUsers): Promise<IResultObject<IManageUsers>> {
    return this.request({
      method: 'PUT',
      url: `/${id}`,
      data: user
    },false)
  }

  async deleteUser(id: bigint): Promise<IResultObject<IManageUsers>> {
    return this.request({
      method: 'DELETE',
      url: `/${id}`
    }, false)
  }
}

export default new AdminService()
