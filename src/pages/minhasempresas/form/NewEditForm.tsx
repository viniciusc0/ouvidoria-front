import JsonForm from 'src/components/JsonForm'
import { ISchemaForm } from 'types/ISchemaForm'

type BusinessNewEditForm = {
    schema: ISchemaForm[]
    values?: any
}

const NewEditForm = ({ schema, values }: BusinessNewEditForm) => {
    const onSubmit = data => {
        console.log(11, data)
    }

    return (
        <JsonForm
            schemaForm={schema}
            values={values}
            onSubmit={onSubmit}
            msgSuccess={'Oba! Salvo com sucesso'}
            // handleCloseSnackbar={handleCloseSnackbar}
            // alertMessage={alertMessage}
        />
    )
}

export default NewEditForm
