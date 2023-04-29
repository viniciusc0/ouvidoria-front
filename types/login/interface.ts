import { UserEntity } from 'types/user/interface'

export type LoginData = {
    identifier: string
    password: string
}
export type LoginResponse = {
    jwt: string
    user: UserEntity
}

export type ForgotPasswordData = {
    email: string
}
