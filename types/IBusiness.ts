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

export type IBusinessForm = {
    id?: string;
    fantasyName: string
    reasonName: string
    cnpj: string
    status: boolean
    contactEmail?: string
    contactPhone?: string
    contactName?: string
    street: string;
    number: string;
    complement: string;
    district: string;
    city: string;
    uf: string;
    cep: string;

}

export type IBusinessFilter = {
    reasonName?: string
    cnpj?: string
    status?: boolean
}
