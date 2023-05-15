import { IUser } from './IUser'

export type ILogin = {
    jwt: string
    user: IUser
}

export type ILoginForm = {
    identifier: string
    password: string
}

export type ILoginForgotPassword = {
    email: string
}

export type INewPassword = {
    password: string
    passwordConfirmation: string
    code: string
}
