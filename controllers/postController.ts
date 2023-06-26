import { PostService } from 'services/postService'
import { IPostListing } from 'types/IPostListing'

export class PostController {
    async getAll(): Promise<{ data: any }> {
        const postService = new PostService()
        return await postService.getAll()
    }

    async getById(id: string): Promise<IPostListing> {
        const postService = new PostService()
        return await postService.getById(id)
    }
}
