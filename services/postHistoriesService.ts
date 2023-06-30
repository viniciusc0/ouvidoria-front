import { IPostHistory } from 'types/IPostHistory'
import api from './api'

export class PostHistoriesService {
    urlBaseService
    constructor() {
        this.urlBaseService = 'posthistories'
    }

    async sendNewComment(data: IPostHistory) {
        console.log(11, data)
        await api.post(this.urlBaseService, { data: data })
    }
}
