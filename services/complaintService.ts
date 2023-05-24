import { IComplaint } from 'types/IComplaint'
import { IComplaintStatus } from 'types/IComplaintHistory'
import { IImageUpload } from 'types/IImageUpload'
import api from './requests/api'

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

    async getHistoryOfComplaint(protocol: string): Promise<IComplaintStatus> {
        return await api.get(`/posthistorybyprotocol/${protocol}`)
    }
}
