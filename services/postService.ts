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

    async editStatus(id: string) {}

    async editSensivity(id: string) {}
}
