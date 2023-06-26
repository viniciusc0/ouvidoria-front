import { IDashUser } from 'types/IDashUser'
import api from './api'

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
}

export default UserService
