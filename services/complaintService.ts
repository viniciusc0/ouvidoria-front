import { IComplaint } from 'types/IComplaint'
import api from './requests/api'
import { IImageUpload } from 'types/IImageUpload'

export default class ComplaintService {
    async sendComplaint(data: IComplaint) {
        return await api.post(`posts`, { data: data })
    }

    async uploadFile(data: File): Promise<IImageUpload[]> {
        console.log(data)
        return await api.post(
            `upload`,
            { files: data },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        )
    }
}
