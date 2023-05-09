import BusinessController from 'controllers/businessController'
import { UserFormSchema } from 'formSchemas/userFormSchema'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import JsonForm from 'src/components/JsonForm'
import Loading from 'src/components/Loading'
import { IBusiness } from 'types/IBusiness'
type UserNewEditForm = {
    values?: any
}

type BusinessEnum = { id: string; name: string }

const NewEditForm = ({ values }: UserNewEditForm) => {
    const router = useRouter()
    const id = router.query.id

    const { enqueueSnackbar } = useSnackbar()

    const onSubmit = async data => {
        //     try {
        //         const businessController = new BusinessController()
        //         if (data.id) {
        //             await businessController.update(data.id, data)
        //             enqueueSnackbar('Oba! Empresa alterada com sucesso!', { variant: 'success' })
        //         } else {
        //             await businessController.create(data)
        //             enqueueSnackbar('Oba! Empresa criada com sucesso', { variant: 'success' })
        //         }
        //         router.push('/minhasempresas')
        //     } catch (error) {
        //         formError(error, enqueueSnackbar)
        //     }

        const businessesIdsArray = [] as BusinessEnum[]
        data.businesses.map(item => businessesIdsArray.push(item.id))
        data.businesses = businessesIdsArray
        console.log(data)
    }

    const [loading, setLoading] = useState(false)
    const [businesses, setBusinesses] = useState<IBusiness[]>([])

    const getBusinesses = async () => {
        setLoading(true)
        const businessControler = new BusinessController()
        const businesses = await businessControler.getAll()
        setBusinesses(businesses)
        setLoading(false)

        const businessesEnum = [] as BusinessEnum[]
        let obj: BusinessEnum
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
