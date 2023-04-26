interface Company{  
    fantasyName: string;
    reasonName: string;
    cnpj: string;
    status: boolean;
    contactName: string;
    contactPhone: string;
}

export interface CompanyCreationProps extends Company{
    // opening_hours: string;
    // end_working_hours: string;
    // work_days: string[];
    tenant: number;
    address: number;
    couriers: number[];
};

export interface CompanyGetProps extends Company{
    id?: string;
    createdAt?: string;
    updatedAt?: string;
};

export interface CompanyFiltersProps{
    corporate_name: string;
    cnpj: string;
    status: boolean;
};