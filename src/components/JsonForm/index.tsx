import { Button } from '@mui/material'
import Form from '@rjsf/mui'
import { RJSFSchema, RegistryWidgetsType, UiSchema } from '@rjsf/utils'
import validator from '@rjsf/validator-ajv8'
import { useEffect, useState } from 'react'
import instance from 'services/requests/api'
import styles from 'styles/Form.module.css'
import { IAddress } from 'types/IAddress'
import { ISchemaForm } from 'types/ISchemaForm'
import TextWidgetWithMask from '../TextWidgetWithMask'
import { Container, FormWrapper } from './styles'

interface Props {
    // schema: RJSFSchema
    // uiSchema: UiSchema
    schemaForm: ISchemaForm[]
    values?: any
    onSubmit: (data) => void
    msgSuccess: string
}

type JSONValue = string | string[] | number | boolean | JSONObject

interface JSONObject {
    [x: string]: JSONValue
}

export default function JsonForm({ schemaForm, values, onSubmit, msgSuccess }: Props) {
    const [schema, setSchema] = useState<RJSFSchema>([])
    const [uiSchema, setUiSchema] = useState<UiSchema>()
    const [formData, setFormData] = useState<any>()

    function transformErrors(errors: any) {
        return errors.map((error: any) => {
            if (error.name === 'required') {
                error.message = 'Esse campo deve ser preenchido'
            }

            if (error.name === 'pattern') {
                error.message = 'Somente números '
            }
            return error
        })
    }

    const widgets: RegistryWidgetsType = {
        TextWidgetWithMask: TextWidgetWithMask,
    }
    const regexNumber = (value: string) => {
        return value.replace(/[^0-9]/g, '')
    }

    const getAddressByCep = async (cep: string) => {
        try {
            cep = regexNumber(cep)
            const res: IAddress = await instance.get(`/cep/${cep}`)
            console.log(res)

            setFormData(old => ({
                ...old,
                cep: res.cep,
                street: res.street,
                district: res.district,
                city: res.city,
                uf: res.uf,
            }))
        } catch (error) {
            console.log(error)
        }
    }

    function onChange(formItems: any) {
        if (formItems.formData.cep != undefined && formItems.formData.cep.length == 10) {
            getAddressByCep(formItems.formData.cep)
        }

        setFormData(formItems.formData)
    }

    const loadSchema = () => {
        const propsSchema = {}
        schemaForm.forEach(schema => {
            propsSchema[schema.name] = {}
            for (const [key, value] of Object.entries(schema.props)) {
                propsSchema[schema.name][key] = value
            }
        })

        const uiSchemaForm = {}
        schemaForm.forEach(schema => {
            uiSchemaForm[schema.name] = {}
            for (const [key, value] of Object.entries(schema.uiSchema)) {
                let keyCustom = `ui:${key}`
                uiSchemaForm[schema.name][keyCustom] = value
            }
        })

        const schemaLoaded: RJSFSchema = {
            type: 'object',
            required: schemaForm.filter(sf => sf.required).map(sf => sf.name),
            properties: propsSchema,
            uiSchema: uiSchemaForm,
        }
        setUiSchema(uiSchemaForm)
        setSchema(schemaLoaded)
        return schemaLoaded
    }

    const submitForm = () => {
        if (!formData) {
            return
        }
        const formDataCustom = onSubmit(formData)
    }

    useEffect(() => {
        loadSchema()
    }, [])

    return (
        <Container>
            <FormWrapper>
                {uiSchema && schema && (
                    <Form
                        id={styles.form}
                        autoComplete="off"
                        schema={schema}
                        noHtml5Validate
                        showErrorList={false}
                        validator={validator}
                        formData={formData}
                        uiSchema={uiSchema}
                        onSubmit={submitForm}
                        onChange={onChange}
                        transformErrors={transformErrors} //customizar mensagem dos erros
                        widgets={widgets}
                    >
                        <Button variant="contained" type="submit">
                            Salvar
                        </Button>
                    </Form>
                )}
            </FormWrapper>
            {/* <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleCloseSnackbar}>
                <Alert variant="filled" severity={alertMessage.type}>
                    {alertMessage.message}
                </Alert>
            </Snackbar> */}
        </Container>
    )
}
