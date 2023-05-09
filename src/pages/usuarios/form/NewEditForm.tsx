import BusinessController from 'controllers/businessController'
import UserController from 'controllers/userController'
import { UserFormSchema } from 'formSchemas/userFormSchema'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import JsonForm, { formError } from 'src/components/JsonForm'
import Loading from 'src/components/Loading'
import { IBusiness } from 'types/IBusiness'
import { IBusinessEnum } from 'types/IBusinessEnum'
type UserNewEditForm = {
    values?: any
}

const NewEditForm = ({ values }: UserNewEditForm) => {
    const router = useRouter()

    const { enqueueSnackbar } = useSnackbar()

    const onSubmit = async data => {
        try {
            const userController = new UserController()
            if (data.id) {
                await userController.update(data.id, data)
                enqueueSnackbar('Oba! Usuário editado com sucesso!', { variant: 'success' })
            } else {
                await userController.create(data)
                enqueueSnackbar('Oba! Usuário criado com sucesso', { variant: 'success' })
            }
            router.push('/usuarios')
        } catch (error) {
            formError(error, enqueueSnackbar)
        }
    }

    const [loading, setLoading] = useState(false)
    const [businesses, setBusinesses] = useState<IBusiness[]>([])

    const getBusinesses = async () => {
        setLoading(true)
        const businessControler = new BusinessController()
        const businesses = await businessControler.getAll()
        setBusinesses(businesses)
        setLoading(false)

        const businessesEnum = [] as IBusinessEnum[]
        let obj: IBusinessEnum
        businesses.map((business, index) => {
            obj = {
                id: business.id!,
                name: business.reasonName,
            }
            businessesEnum.push(obj)
        })
        const businessSchema = UserFormSchema.find(item => item.props.items !== undefined && item.name === 'businesses')
        UserFormSchema[UserFormSchema.indexOf(businessSchema!)].props.items.enum = businessesEnum
    }

    useEffect(() => {
        getBusinesses()
    }, [])

    if (loading) return <Loading />

    return (
        <JsonForm
            schemaForm={UserFormSchema}
            values={values}
            onSubmit={onSubmit}
            msgSuccess={'Oba! Salvo com sucesso'}
        />
    )
}

export default NewEditForm
