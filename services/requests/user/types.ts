export interface UserCreationProps {
    name: string;
    cpf: string;
    status: boolean;
    role: {
        "name": "Administrador",
        "const": "admin"
    } | {
        "name": "Comum",
        "const": "regular"
    }
};

export interface UserGetProps {
    id?: string;
    name: string;
    cpf: string;
    status: boolean;
    role: {
        "name": "Administrador",
        "const": "admin"
    } | {
        "name": "Comum",
        "const": "regular"
    }
};


export interface UserInfo {
    id: string;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
};