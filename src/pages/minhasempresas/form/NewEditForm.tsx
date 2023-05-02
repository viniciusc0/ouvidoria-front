import BusinessController from 'controllers/businessController'
import { useRouter } from 'next/router'
import JsonForm from 'src/components/JsonForm'
import { convertBusinessDataToBackendFormat } from 'src/utils/functions'
import { ISchemaForm } from 'types/ISchemaForm'

type BusinessNewEditForm = {
    schema: ISchemaForm[]
    values?: any
}

const NewEditForm = ({ schema, values }: BusinessNewEditForm) => {

    const router = useRouter();
    const id = router.query.id;

    const onSubmit = async data => {
        console.log(data);
        const businessController = new BusinessController();
        if (typeof id === 'string') {
            //edição
            try {
                await businessController.put(id, convertBusinessDataToBackendFormat(data));
            } catch (error) {

            }
        } else {
            //cadastro
            try {
                await businessController.create(convertBusinessDataToBackendFormat(data));
            } catch (error) {

            }
        }

    }

    return (
        <JsonForm
            schemaForm={schema}
            values={values}
            onSubmit={onSubmit}
            msgSuccess={'Oba! Salvo com sucesso'}
        />
    )
}

export default NewEditForm
