import Cookies from 'js-cookie'
import AuthService from 'services/requests/usersAuth/authService'
import { LoginData, LoginResponse } from 'types/login/interface'

class AuthController {
    keyUser = '@latlong/user'

    async login(data: LoginData) {
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

    setUser(data: LoginResponse) {
        Cookies.set('token', data.jwt, {
            expires: 2,
        })

        localStorage.setItem(this.keyUser, JSON.stringify(data.user))
    }

    getUser(): LoginResponse | undefined {
        const user = localStorage.getItem(this.keyUser)
        const token = Cookies.get('token')
        if (!user || !token) {
            this.logout()
            return
        }

        return {
            user: JSON.parse(user),
            jwt: token,
        }
    }

    logout(): void {
        Cookies.remove('token')
        localStorage.clear()
        location.href = '/login'
    }
}

export default AuthController
