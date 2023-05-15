import UserService from 'services/userService'
import { removeMask } from 'src/utils/functions'
import { IDashUser, IDashUserFilter } from 'types/IDashUser'

class UserController {
    private removeMasksAndMountBusinessesArray(user: IDashUser): IDashUser {
        user.cpf = removeMask(user.cpf)
        user.phone = removeMask(user.phone)

        const businessesIdsArray = [] as string[]
        user.businesses.map((item: any) => businessesIdsArray.push(item.id))
        user.businesses = businessesIdsArray

        return user
    }

    async getAll(filters?: IDashUserFilter): Promise<IDashUser[]> {
        const urlParams = new URLSearchParams()
        if (filters) {
            Object.keys(filters).forEach(key => {
                if (filters && filters[key] != undefined && filters[key] !== '') {
                    urlParams.append(`filters[${key}]`, filters[key])
                }
            })
        }
        const userService = new UserService()
        return await userService.getAll(urlParams)
    }

    async getById(id: string): Promise<IDashUser> {
        const userService = new UserService()
        return await userService.getById(id)
    }

    async update(id: string, user: IDashUser): Promise<IDashUser> {
        const userService = new UserService()
        user = this.removeMasksAndMountBusinessesArray(user)
        return await userService.update(id, user)
    }

    async create(user: IDashUser): Promise<IDashUser> {
        const userService = new UserService()
        user = this.removeMasksAndMountBusinessesArray(user)
        return await userService.create(user)
    }
}

export default UserController
