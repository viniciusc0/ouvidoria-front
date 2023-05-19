import TenantService from 'services/tenantService'
import { ICompanyInfo } from 'types/ICompanyInfo'

export default class TenantController {
    async getBasicInformation(companyName: string): Promise<ICompanyInfo> {
        const tenantService = new TenantService()
        return await tenantService.getBasicInformation(companyName)
    }
}
