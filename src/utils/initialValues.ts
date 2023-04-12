import { DeliverymanGetProps } from "services/requests/deliveryman/interfaces";
import { UserGetProps } from "services/requests/user/interfaces";

export const userInitialValue = {
    name: '',
    cpf: '',
    role: 'regular',
    status: true
} as UserGetProps;


export const deliverymanInitialValue = {
    name: '',
    cpf: '',
    init_time: '',
    end_time: '',
    work_days: []
} as DeliverymanGetProps;