export interface UserCreationProps{
    name: string;
    cpf: string;
    status: boolean;
    role: string
};

export interface UserGetProps{
    id?: string;
    name: string;
    cpf: string;
    status: boolean;
    role: string
};