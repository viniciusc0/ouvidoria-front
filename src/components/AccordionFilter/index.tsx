import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Typography } from '@mui/material'
import { IChangeEvent } from '@rjsf/core'
import { Form } from '@rjsf/mui'
import { ObjectFieldTemplateProps, RJSFSchema, RegistryWidgetsType, UiSchema, WidgetProps } from '@rjsf/utils'
import validator from '@rjsf/validator-ajv8'
import { useEffect, useState } from 'react'
import { ISchemaForm } from 'types/ISchemaForm'
import TextWidgetWithMask from '../TextWidgetWithMask'

interface Props {
    schemaForm: ISchemaForm[]
    setFilters: (data: any) => void
    customSubmit?: (formItems: IChangeEvent) => void
}

export default function AccordionFilter({ schemaForm, setFilters, customSubmit }: Props) {
    function onSubmit(formItems: IChangeEvent) {
        setFilters(formItems.formData)
    }

    const CustomCheckbox = function (props: WidgetProps) {
        return (
            <div style={{ display: 'flex', position: 'relative', top: '25px', paddingLeft: '10px' }}>
                <input
                    type="checkbox"
                    id="custom-checkbox"
                    className={props.value ? 'checked' : 'unchecked'}
                    onClick={() => props.onChange(!props.value)}
                    defaultChecked={props.value ? true : false}
                />
                <label htmlFor="custom-checkbox" style={{ paddingLeft: '5px' }}>
                    {String(props.label)}
                </label>
            </div>
        )
    }

    const widgets: RegistryWidgetsType = {
        CheckboxWidget: CustomCheckbox,
        TextWidgetWithMask: TextWidgetWithMask,
    }

    const [schema, setSchema] = useState<RJSFSchema>([])
    const [uiSchema, setUiSchema] = useState<UiSchema>()
    const [formData, setFormData] = useState<any>()

    const loadSchema = () => {
        const propsSchema = {}
        if (!schemaForm.length) {
            return
        }
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

    useEffect(() => {
        loadSchema()
    }, [])

    return (
        <Grid item xs={12} sx={{ boxShadow: '1px 1px 10px #ccc', borderRadius: 1 }}>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>Filtros</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid item xs={12}>
                        {uiSchema && schema && (
                            <Form
                                autoComplete="off"
                                widgets={widgets}
                                schema={schema}
                                uiSchema={uiSchema}
                                validator={validator}
                                formData=""
                                templates={{ ObjectFieldTemplate }}
                                onSubmit={customSubmit ? customSubmit : onSubmit}
                            >
                                <Grid container justifyContent={'flex-end'} spacing={2}>
                                    <Button variant="contained" type="submit">
                                        Filtrar
                                    </Button>
                                    <Button variant="outlined">Limpar Filtros</Button>
                                </Grid>
                            </Form>
                        )}
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </Grid>
    )
}

function ObjectFieldTemplate(props: ObjectFieldTemplateProps) {
    return (
        <div>
            <h3>{props.title}</h3>
            <p>{props.description}</p>
            <div style={{ display: 'flex' }}>
                {props.properties.map((element: any, index: number) => (
                    <div key={index} style={{ margin: '0 5px 10px 5px ' }}>
                        {element.content}
                    </div>
                ))}
            </div>
        </div>
    )
}
