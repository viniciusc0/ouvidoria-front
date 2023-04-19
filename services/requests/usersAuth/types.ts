export interface LoginProps {
    identifier: string;
    password: string;
    email?: string;
};

export interface RegisterProps {
    username: string;
    email: string;
    password: string;
};

export interface LoginRegisterResponseProps {
    jwt: string;
    user: {
        id: string;
        username: string;
        email: string;
        provider: string;
        confirmed: string;
        blocked: string;
        createdAt: string;
        updatedAt: string;
    }
};

export interface ResetPasswordProps{
    password: string;
    passwordConfirmation: string;
    code: string;
};

export interface ChangePasswordProps{
    currentPassword: string;
    password: string;
    passwordConfirmation: string;
};