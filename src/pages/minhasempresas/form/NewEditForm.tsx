import BusinessController from 'controllers/businessController'
import { BusinessFormSchema } from 'formSchemas'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { ApolloForm } from 'src/components'
import { formError } from 'src/components/JsonForm'
type BusinessNewEditForm = {
    values?: any
}

const NewEditForm = ({ values }: BusinessNewEditForm) => {
    const router = useRouter()
    const id = router.query.id

    const { enqueueSnackbar } = useSnackbar()

    const onSubmit = async data => {
        let regex = /\d\d\.\d\d\d\.\d\d\d\/\d\d\d\d-\d\d/i
        if (!regex.test(data.cnpj)) {
            enqueueSnackbar('CNPJ inválido!', { variant: 'error' })
            return
        }

        regex = /\(\d\d\)\d\d\d\d\d-\d\d\d\d/i
        if (!regex.test(data.contactPhone)) {
            enqueueSnackbar('Telefone inválido!', { variant: 'error' })
            return
        }

        try {
            const businessController = new BusinessController()
            if (data.id) {
                await businessController.update(data.id, data)
                enqueueSnackbar('Oba! Empresa alterada com sucesso!', { variant: 'success' })
            } else {
                await businessController.create(data)
                enqueueSnackbar('Oba! Empresa criada com sucesso', { variant: 'success' })
            }
            router.push('/minhasempresas')
        } catch (error) {
            formError(error, enqueueSnackbar)
        }
    }

    return (
        <ApolloForm
            schema={BusinessFormSchema}
            initialValues={values}
            onSubmit={onSubmit}
            submitButtonText="Enviar"
            defaultExpandedGroup={true}
        />
    )
}

export default NewEditForm
