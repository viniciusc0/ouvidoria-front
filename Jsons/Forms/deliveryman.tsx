import { RJSFSchema } from "@rjsf/utils";

export const deliveryman =
{
    "schema": {
        "description": "Entregador",
        "type": "object",
        "required": [
            "name", "cpf", "init_time", "end_time", "work_days"
        ],
        "properties": {
            "name": {
                "type": "string",
                "title": "Nome",
            },
            "cpf": {
                "type": "string",
                "title": "CPF",
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
            "work_days": {
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
            'ui:widget': "TextWidgetWithMask",
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
        "work_days": {
            "ui:widget": "CheckboxesWidget"
        }
    }
} as RJSFSchema;

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