import { PostHistoriesService } from 'services/postHistoriesService'
import { IPostHistory } from 'types/IPostHistory'

export class PostHistoriesController {
    async sendNewComment(data: IPostHistory) {
        const postHistoriesService = new PostHistoriesService()
        await postHistoriesService.sendNewComment(data)
    }
}
