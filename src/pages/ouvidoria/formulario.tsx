import { OuvidoriaFormSchema } from 'formSchemas/ouvidoriaFormSchema'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import JsonForm from 'src/components/JsonForm'

const Form = ({ values }) => {
    const router = useRouter()
    const id = router.query.id

    const { enqueueSnackbar } = useSnackbar()

    const onSubmit = async data => {}

    return (
        <JsonForm
            schemaForm={OuvidoriaFormSchema}
            values={values}
            onSubmit={onSubmit}
            msgSuccess={'Oba! Salvo com sucesso'}
        />
    )
}
export default Form
