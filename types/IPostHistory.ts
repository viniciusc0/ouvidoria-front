import { IMedia } from './IMedia'

export type IPostHistory = {
    id: string
    comment: string
    createdAt: string
    updatedAt: string
    media: IMedia[]
    user: { id: string; fullname: string; email: string; username: string }
}
