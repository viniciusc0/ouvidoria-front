import { IMedia } from './IMedia'

export type IPostHistory = {
    id?: string
    comment: string
    createdAt?: string
    updatedAt?: string
    media?: IMedia[] | string[]
    user: string
    tenant?: string
    post?: string
}
