import { TextField } from "@mui/material";
import { WidgetProps } from "@rjsf/utils"
import InputMask from "react-input-mask";


export const deliveryman =
{
    "schema": {
        "description": "Entregador",
        "type": "object",
        "required": [

        ],
        "properties": {
            "name": {
                "type": "string",
                "title": "Nome",
            },
            "cpf": {
                "type": "string",
                "title": "Cpf",
            },
            "init_time": {
                "type": "string",
                "title": "Horário de início",
                "format": "time"
            },
            "end_time": {
                "type": "string",
                "title": "Horário de término",
                "format": "time"
            },
            "days_work": {
                "title": "Dias de trabalho",
                "type": "array",
                "uniqueItems": true,
                "items": {
                    "enum": [
                        'Segunda',
                        'Terça',
                        'Quarta',
                        'Quinta',
                        'Sexta',
                        'Sábado',
                        'Domingo',
                    ]
                }
            }
        }
    },
    "uiSchema": {
        "name": {
            "ui:autofocus": true,
            "ui:placeholder": "Digite o nome do entregador"
        },
        "cpf": {
            "ui:placeholder": "Digite o cpf do entregador",
            'ui:widget': (props: WidgetProps) => (
                <InputMask
                    mask={props.options.mask as string}
                    type='text'
                    className='custom'
                    value={props.value}
                    required={props.required}
                    onChange={(event) => props.onChange(event.target.value)}
                >
                    <TextField
                        id="outlined-basic"
                        label={props.label}
                        placeholder={props.placeholder}
                    />
                </InputMask>
            ),
            'ui:options': {
                mask: '999.999.999-99',
            },
        },
        "init_time": {
            "ui:placeholder": "Digite o horário de início do expediente"
        },
        "end_time": {
            "ui:placeholder": "Digite o horário de fim do expediente"
        },
        "days_work": {
            "ui:widget": "CheckboxesWidget"
        }
    }
}

// export const categoryFiltersJson = {
//     schema: {
//         properties: {
//             description: {
//                 type: "string",
//                 title: "Descrição",
//             },
//             limit: {
//                 type: "number",
//                 title: "Limite",
//             },
//             offset: {
//                 type: "number",
//                 title: "Offset",
//             },
//             status: {
//                 type: "boolean",
//                 title: "Ativa",
//                 default: true
//             },
//         },
//     },
//     formData: {
//     },
//     uiSchema: {
//         status: {
//             "ui:widget": "CheckboxWidget",
//         }
//     }
// };