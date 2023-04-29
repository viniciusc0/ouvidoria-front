import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Typography } from '@mui/material'
import { IChangeEvent } from '@rjsf/core'
import { Form } from '@rjsf/mui'
import { ObjectFieldTemplateProps, RegistryWidgetsType, UiSchema, WidgetProps } from '@rjsf/utils'
import validator from '@rjsf/validator-ajv8'
import TextWidgetWithMask from '../TextWidgetWithMask'

interface Props {
    formJson: any
    setFilters: (data: any) => void
    customSubmit?: (formItems: IChangeEvent) => void
}

export default function AccordionFilter({ formJson, setFilters, customSubmit }: Props) {
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

    return (
        <Grid item xs={12} sx={{ boxShadow: '1px 1px 10px #ccc', borderRadius: 1 }}>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>Filtros</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid item xs={12}>
                        <Form
                            autoComplete="off"
                            widgets={widgets}
                            schema={formJson.schema}
                            uiSchema={formJson.uiSchema as UiSchema}
                            validator={validator}
                            formData={formJson.formData}
                            templates={{ ObjectFieldTemplate }}
                            onSubmit={customSubmit ? customSubmit : onSubmit}
                        >
                            <Grid container justifyContent={'flex-end'}>
                                <Button variant="contained">Filtrar</Button>
                            </Grid>
                        </Form>
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
