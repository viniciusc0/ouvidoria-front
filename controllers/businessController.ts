import BusinessService from 'services/businessService'
import { IBusiness, IBusinessFilter } from 'types/IBusiness'

class BusinessController {
    async getAll(filters?: IBusinessFilter): Promise<IBusiness[]> {
        const urlParams = new URLSearchParams()
        if (filters) {
            Object.keys(filters).forEach(key => {
                if (filters && filters[key] != undefined) {
                    urlParams.append(`filters[${key}]`, filters[key])
                }
            })
        }
        const businessService = new BusinessService()
        return await businessService.getAll(urlParams)
    }

    async getById(id: string): Promise<IBusiness> {
        const businessService = new BusinessService()
        return await businessService.getById(id)
    }

    async put(id: string, business: IBusiness): Promise<IBusiness> {
        const businessService = new BusinessService()
        return await businessService.update(id, business)
    }
}

export default BusinessController
