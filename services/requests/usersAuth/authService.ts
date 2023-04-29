import api from 'services/requests/api'
import { ForgotPasswordData, LoginData, LoginResponse } from 'src/@types/login/interface'

class AuthService {
    urlBaseService

    constructor() {
        this.urlBaseService = '/auth'
    }

    async login(data: LoginData): Promise<LoginResponse> {
        return await api.post(`${this.urlBaseService}/local`, data)
    }

    async forgotPassword(data: ForgotPasswordData): Promise<{ ok: boolean } | undefined> {
        return await api.post(`${this.urlBaseService}/forgot-password`, data)
    }
}

export default AuthService
