import BusinessController from 'controllers/businessController'
import { BusinessFormSchema } from 'formSchemas'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import JsonForm, { formError } from 'src/components/JsonForm'
type BusinessNewEditForm = {
    values?: any
}

const NewEditForm = ({ values }: BusinessNewEditForm) => {
    const router = useRouter()
    const id = router.query.id

    const { enqueueSnackbar } = useSnackbar()

    const onSubmit = async data => {
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
        <JsonForm
            schemaForm={BusinessFormSchema}
            values={values}
            onSubmit={onSubmit}
            msgSuccess={'Oba! Salvo com sucesso'}
        />
    )
}

export default NewEditForm
