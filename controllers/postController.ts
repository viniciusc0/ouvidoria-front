import { PostService } from 'services/postService'

export class PostController {
    async getAll(): Promise<{ data: any }> {
        const postService = new PostService()
        return await postService.getAll()
    }

    async getById(id: string): Promise<{ data: any }> {
        const postService = new PostService()
        return await postService.getById(id)
    }
}
