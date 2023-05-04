import { DeliverymanGetProps } from "services/requests/deliveryman/types";
import { UserGetProps } from "services/requests/user/types";
import { IUser } from "types/IUser";
import { IBusiness } from "types/IBusiness";
import { IBusinessFilter } from "types/IBusiness";

export const userInitialValue = {
    id: 0,
    cpf: '',
    name:  '',
    blocked: false,
    confirmed: true,
    email: '',
    provider: '',
    username: ''

} as IUser;


export const deliverymanInitialValue = {
    business: 0,
    cpf: '',
    days: [],
    hourFinal: '',
    hourStart:  '',
    name: '',
    phone: '',
    tenant: 0,
} as DeliverymanGetProps;

export const businessInitialValue = {
    cnpj:  '',
    contactName: '',
    contactPhone: '',
    fantasyName: '',
    reasonName: '',
    status: true,

} as IBusiness;

export const businessFormDataInitialValue = {
    fantasyName: '',
    reasonName: '',
    cnpj: '',
    status: true,
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    street: '',
    number: '',
    complement: '',
    district: '',
    city: '',
    uf: '',
    cep: '',
};

export const businessFiltersInitialValue = {
    reasonName: '',
    cnpj: '',
    status: true,
} as IBusinessFilter;