import axios from 'axios'
import Cookies from 'js-cookie'
import { BASE_API } from 'src/config'

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: BASE_API.base_url })

axiosInstance.interceptors.request.use(
    function (config) {
        const token = Cookies.get('token')
        if (token !== undefined && config.headers !== undefined) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    function (error) {
        return Promise.reject(error)
    },
)

axiosInstance.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        if (error.response.status == 401 || error.response.status == 403) {
            Cookies.remove('token')
            location.href = '/login'
        }
        return Promise.reject(error)
    },
)

export default axiosInstance
