import { CompanyGetProps } from "services/requests/company/interfaces";
import { DeliverymanGetProps } from "services/requests/deliveryman/interfaces";
import { UserGetProps } from "services/requests/user/interfaces";

export const userInitialValue = {
    name: '',
    cpf: '',
    role: {
        "name": "Comum",
        "const": "regular"
    },
    status: true
} as UserGetProps;


export const deliverymanInitialValue = {
    name: '',
    cpf: '',
    init_time: '',
    end_time: '',
    work_days: ['']
} as DeliverymanGetProps;

export const companyInitialValue = {
    corporate_name: '',
    commercial_name: '',
    cnpj: '',
    status: true,
    opening_hours: '',
    end_working_hours: '',
    work_days: [""],
    cep: '',
    public_place: '',
    number: '',
    neighboorhood: '',
    city: '',
    state: ''

} as CompanyGetProps;