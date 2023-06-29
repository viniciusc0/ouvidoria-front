import { IDashUser } from 'types/IDashUser'
import api from './api'
import { UserInfo } from './requests/user/types'

class UserService {
    urlBaseService

    constructor() {
        this.urlBaseService = '/users'
    }

    async getAll(filters: URLSearchParams): Promise<IDashUser[]> {
        return await api.get(`${this.urlBaseService}?${filters}`)
    }

    async getById(id: string): Promise<IDashUser> {
        return await api.get(`${this.urlBaseService}/${id}`)
    }
    r
    async create(user: IDashUser): Promise<IDashUser> {
        return await api.post(`${this.urlBaseService}`, {
            data: user,
        })
    }

    async update(id: string, user: IDashUser): Promise<IDashUser> {
        return await api.put(`${this.urlBaseService}/${id}`, {
            data: user,
        })
    }

    async getCurrentUserInfo(): Promise<UserInfo> {
        return await api.get(this.urlBaseService)
    }
}

export default UserService
