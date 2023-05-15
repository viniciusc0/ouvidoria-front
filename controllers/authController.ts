import Cookies from 'js-cookie'
import AuthService from 'services/authService'
import { ILogin, ILoginForgotPassword, ILoginForm, INewPassword } from 'types/IAuth'
import { IUser } from 'types/IUser'

class AuthController {
    keyUser = '@ouvidoria/user'

    async login(data: ILoginForm) {
        try {
            const authService = new AuthService()
            const response = await authService.login(data)
            if (!response.jwt) {
                throw new Error('Exception: Access Token undefined')
            }
            this.setUser(response)
            location.href = '/'
        } catch (error) {
            return error
        }
    }

    setUser(data: ILogin) {
        Cookies.set('token', data.jwt, {
            expires: 2,
        })
        localStorage.setItem(this.keyUser, JSON.stringify(data.user))
    }

    getUser(): IUser | undefined {
        const user = localStorage.getItem(this.keyUser)
        const token = Cookies.get('token')
        if (!user || !token) {
            this.logout()
            return
        }
        return JSON.parse(user)
    }

    logout(): void {
        Cookies.remove('token')
        localStorage.clear()
        location.href = '/login'
    }

    async sendPasswordRecoveryEmail(data: ILoginForgotPassword) {
        const authService = new AuthService()
        return await authService.forgotPassword(data)
    }

    async changePassword(data: INewPassword) {
        const authService = new AuthService()
        return await authService.resetPassword(data)
    }
}

export default AuthController
