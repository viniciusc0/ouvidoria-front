import BusinessController from 'controllers/businessController'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import JsonForm, { formError } from 'src/components/JsonForm'
import { ISchemaForm } from 'types/ISchemaForm'

type BusinessNewEditForm = {
    schema: ISchemaForm[]
    values?: any
}

const NewEditForm = ({ schema, values }: BusinessNewEditForm) => {
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
            console.log(error)
            formError(error, enqueueSnackbar)
        }
    }

    return <JsonForm schemaForm={schema} values={values} onSubmit={onSubmit} msgSuccess={'Oba! Salvo com sucesso'} />
}

export default NewEditForm
