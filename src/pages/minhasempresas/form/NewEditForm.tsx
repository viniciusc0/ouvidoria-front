import BusinessController from 'controllers/businessController'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import JsonForm from 'src/components/JsonForm'
import { convertBusinessDataToBackendFormat } from 'src/utils/functions'
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
        const businessController = new BusinessController()
        try {
            if (typeof id === 'string' && data.id) {
                await businessController.put(id, convertBusinessDataToBackendFormat(data))
                enqueueSnackbar('Alteração realizada!', { variant: 'success' })
            } else {
                await businessController.create(convertBusinessDataToBackendFormat(data))
                enqueueSnackbar('Alteração realizada!', { variant: 'success' })
            }
            router.push('/minhasempresas')
        } catch (error) {
            if (typeof id === 'string' && data.id) {
                enqueueSnackbar('Erro ao editar empresa', { variant: 'error' })
            } else {
                enqueueSnackbar('Erro ao cadastrar empresa', { variant: 'error' })
            }
        }
    }

    return <JsonForm schemaForm={schema} values={values} onSubmit={onSubmit} msgSuccess={'Oba! Salvo com sucesso'} />
}

export default NewEditForm
