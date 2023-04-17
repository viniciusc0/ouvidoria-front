export interface CompanyCreationProps{
    corporate_name: string;
    commercial_name?: string;
    cnpj: string;
    status: boolean;
    opening_hours: string;
    end_working_hours: string;
    work_days: string[];
    cep: string;
    public_place: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
};


export interface CompanyGetProps extends CompanyCreationProps{
    id?: string;
};