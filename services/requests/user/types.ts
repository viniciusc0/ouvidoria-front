export interface UserInfo {
    id?: string;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt?: string;
    updatedAt?: string;
};

export interface UserCreationProps {
    username: string;
    email: string;
    password: string;
    // role: {
    //     "name": "Administrador",
    //     "const": "admin"
    // } | {
    //     "name": "Comum",
    //     "const": "regular"
    // }
};

export interface UserGetProps{
    id?: string;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt?: string;
    updatedAt?: string;
    // role: {
    //     "name": "Administrador",
    //     "const": "admin"
    // } | {
    //     "name": "Comum",
    //     "const": "regular"
    // }
};


