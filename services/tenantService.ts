import { ICompanyInfo } from 'types/ICompanyInfo'
import api from './requests/api'

export default class TenantService {
    async getBasicInformation(companyName: string): Promise<ICompanyInfo> {
        return await api.get(`gettenantbyidentity/${companyName}`)
    }
}
