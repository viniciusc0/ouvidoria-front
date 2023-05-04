import { IAddress } from './IAddress'

export type IBusiness = {
    fantasyName?: string
    reasonName: string
    cnpj: string
    status: boolean
    contactEmail?: string
    contactPhone?: string
    contactName?: string
    address?: IAddress
}

export type IBusinessFilter = {
    reasonName?: string
    cnpj?: string
    status?: boolean
}
