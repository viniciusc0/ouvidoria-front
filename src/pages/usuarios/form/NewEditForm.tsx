import BusinessController from 'controllers/businessController'
import UserController from 'controllers/userController'
import { UserFormSchema } from 'formSchemas/userFormSchema'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { ApolloForm, ApolloFormSchemaItem } from 'src/components'
import { formError } from 'src/components/JsonForm'
import Loading from 'src/components/Loading'
import SelectWithCheckboxes from 'src/components/SelectWithCheckboxes'
import { ISelectValue } from 'types/ISelectValue'

type UserNewEditForm = {
    values?: any
}

const NewEditForm = ({ values }: UserNewEditForm) => {
    const router = useRouter()

    const [selectValue, setSelectValue] = useState<string[]>([])
    const [selectOptions, setSelectOptions] = useState<ISelectValue[]>([
        { label: 'teste', value: '1' },
        { label: 'teste2', value: '2' },
    ])

    const formSchema: ApolloFormSchemaItem[] = [
        ...UserFormSchema,
        {
            name: 'businesses',
            required: false,
            label: 'Empresas',
            ui: { grid: 6 },
            renderComponent(params) {
                return (
                    <SelectWithCheckboxes
                        label="Empresas"
                        options={selectOptions}
                        value={selectValue}
                        setValue={setSelectValue}
                    />
                )
            },
        },
    ]

    const { enqueueSnackbar } = useSnackbar()

    const onSubmit = async data => {
        try {
            const userController = new UserController()
            if (data.id) {
                await userController.update(data.id, data)
                enqueueSnackbar('Oba! Usuário editado com sucesso!', { variant: 'success' })
            } else {
                await userController.create(data)
                enqueueSnackbar(
                    'Oba! Cadastro realizado com sucesso! Um email de confirmação foi enviado para o usuário',
                    {
                        variant: 'success',
                        autoHideDuration: null,
                    },
                )
            }
            router.push('/usuarios')
        } catch (error) {
            formError(error, enqueueSnackbar)
        }
    }

    const [loading, setLoading] = useState(false)

    const getBusinesses = async () => {
        setLoading(true)
        const businessControler = new BusinessController()
        try {
            const businesses = await businessControler.getAll()
            const businessesSelectOptions = [] as ISelectValue[]
            let obj: ISelectValue
            businesses.map((business, index) => {
                obj = {
                    value: business.id!,
                    label: business.reasonName,
                }
                businessesSelectOptions.push(obj)
            })
            setSelectOptions(businessesSelectOptions)
        } catch (error) {
            enqueueSnackbar('Não há empresas cadastradas', {
                variant: 'error',
                autoHideDuration: null,
            })
        }
        setLoading(false)
    }

    useEffect(() => {
        getBusinesses()
    }, [])

    if (loading) return <Loading />

    return (
        <ApolloForm
            schema={formSchema}
            initialValues={values}
            onSubmit={onSubmit}
            submitButtonText="Enviar"
            defaultExpandedGroup={true}
        />
    )
}

export default NewEditForm
