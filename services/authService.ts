import api from 'services/requests/api'
import { ILogin, ILoginForgotPassword, ILoginForm } from 'types/IAuth'

class AuthService {
    urlBaseService

    constructor() {
        this.urlBaseService = '/auth'
    }

    async login(data: ILoginForm): Promise<ILogin> {
        return await api.post(`${this.urlBaseService}/local`, data)
    }

    async forgotPassword(data: ILoginForgotPassword): Promise<{ ok: boolean } | undefined> {
        return await api.post(`${this.urlBaseService}/forgot-password`, data)
    }
}

export default AuthService
