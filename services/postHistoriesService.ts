import { IPostHistory } from 'types/IPostHistory'
import api from './api'

export class PostHistoriesService {
    urlBaseService
    constructor() {
        this.urlBaseService = 'posthistories'
    }

    async sendNewComment(data: IPostHistory) {
        await api.post(this.urlBaseService, { data: data })
    }
}
