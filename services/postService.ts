import api from './api'

export class PostService {
    urlBaseService

    constructor() {
        this.urlBaseService = '/posts'
    }

    async getAll() {
        // async getAll(filters: URLSearchParams): Promise<IPostListing[]> {
        // return await api.get(`${this.urlBaseService}?${filters}`)
        return await api.get(`${this.urlBaseService}?populate=tenant`)
    }

    async getById(id: string) {
        return await api.get(`${this.urlBaseService}/${id}`)
    }

    async update(data: any, id: string) {
        await api.put(`${this.urlBaseService}/${id}`, { data: data })
    }
}
