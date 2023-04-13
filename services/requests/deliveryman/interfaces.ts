export interface DeliverymanCreationProps{
    name: string;
    cpf: string;
    init_time: string;
    end_time:string;
    work_days: string[]
};

export interface DeliverymanGetProps{
    id?: string;
    name: string;
    cpf: string;
    init_time: string;
    end_time:string;
    work_days: string[]
};