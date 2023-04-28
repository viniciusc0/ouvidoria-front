import { RJSFSchema } from "@rjsf/utils";

export const company =
{
    "schema": {
        "description": "Empresa",
        "type": "object",
        "required": [            
            "opening_hours",
            "end_working_hours",
            "work_days",
            "reasonName",
            "cnpj",
            "fantasyName",
            "status",
            "contactName",
            "contactPhone",
            "street",
            "number",
            "district",
            "city",
            "uf",
            "cep"
        ],
        "properties": {
            "reasonName": {
                "type": "string",
                "title": "Razão social",
            },
            "fantasyName": {
                "type": "string",
                "title": "Nome fantasia",
            },
            "contactName": {
                "type": "string",
                "title": "Nome do contato",
            },
            "contactEmail": {
                "type": "string",
                "title": "Email de contato",
            },
            "contactPhone": {
                "type": "string",
                "title": "Telefone de contato",
            },
            "cnpj": {
                "type": "string",
                "title": "CNPJ",
            },
            "status": {
                "type": "boolean",
                "title": "Status",
                "oneOf": [
                    { "const": true, "title": "Ativo(a)" },
                    { "const": false, "title": "Inativo(a)" }
                ]
            },
            // "opening_hours": {
            //     "type": "string",
            //     "title": "Horário de funcionamento (início)",
            //     "format": "time"
            // },
            // "end_working_hours": {
            //     "type": "string",
            //     "title": "Horário de funcionamento (término)",
            //     "format": "time"
            // },
            // "work_days": {
            //     "title": "Dias de trabalho",
            //     "type": "array",
            //     "uniqueItems": true,
            //     "items": {
            //         "enum": [
            //             'Segunda',
            //             'Terça',
            //             'Quarta',
            //             'Quinta',
            //             'Sexta',
            //             'Sábado',
            //             232323233'Domingo',
            //         ]
            //     }
            // },
            "cep": {
                "type": "string",
                "title": "CEP",
            },
            "street": {
                "type": "string",
                "title": "Logradouro",
            },
            "number": {
                "type": "number",
                "title": "Número",
            },
            "district": {
                "type": "string",
                "title": "Bairro",
            },
            "city": {
                "type": "string",
                "title": "Cidade",
            },
            "uf": {
                "type": "string",
                "title": "Estado",
            },
        }
    },
    "uiSchema": {
        "reasonName": {
            "ui:autofocus": true,
            "ui:placeholder": "Digite a razão social da empresa"
        },
        "fantasyName": {
            "ui:placeholder": "Digite o nome fantasia da empresa"
        },
        "contactName": {
            "ui:placeholder": "Digite o nome de um contato da empresa"
        },
        "contactEmail": {
            "ui:placeholder": "Digite o email de contato da empresa"
        },
        "contactPhone": {
            "ui:placeholder": "Digite o telefone de contato da empresa",
            "ui:widget" : "TextWidgetWithMask",
            'ui:options': {
                "mask": '(99)99999-9999',
            },
        },
        "cnpj": {
            "ui:placeholder": "Digite o cnpj da empresa",
            "ui:widget" : "TextWidgetWithMask",
            'ui:options': {
                "mask": '99.999.999/9999-99',
            },
        },
        "opening_hours": {
            "ui:placeholder": "Digite o horário de início do expediente"
        },
        "end_working_hours": {
            "ui:placeholder": "Digite o horário de fim do expediente"
        },
        "work_days": {
            "ui:widget": "CheckboxesWidget"
        },
        "cep": {
            "ui:placeholder": "Digite o CEP",
            "ui:widget" : "TextWidgetWithMask",
            'ui:options': {
                "mask": '99999-999',
            },
        },
        "street": {
            "ui:placeholder": "Digite o logradouro"
        },
        "number": {
            "ui:placeholder": "Digite o número",
            "ui:widget" : "TextWidgetWithMask",
            'ui:options': {
                "mask": '999999999',
            },
        },
        "district": {
            "ui:placeholder": "Digite o bairro"
        },
        "city": {
            "ui:placeholder": "Digite a cidade"
        },
        "uf": {
            "ui:placeholder": "Digite o estado"
        },
        "status": {
            "ui:widget": "RadioWidget"
        }
    }
} as RJSFSchema;


export const companyFiltersJson =
{
    "schema": {
        "properties": {
            "reasonName": {
                "type": "string",
                "title": "Razão social",
            },
            "cnpj": {
                "type": "string",
                "title": "CNPJ",
            },
            "status": {
                "type": "boolean",
                "title": "Status",
                "oneOf": [
                    { "const": true, "title": "Ativo(a)" },
                    { "const": false, "title": "Inativo(a)" }
                ]
            },
        }
    },
    "uiSchema": {
        "reasonName": {
            "ui:autofocus": true,
            "ui:placeholder": "Digite a razão social da empresa"
        },
        "cnpj": {
            "ui:placeholder": "Digite o cnpj da empresa",
            "ui:widget" : "TextWidgetWithMask",
            'ui:options': {
                "mask": '99.999.999/9999-99',
            },
        },
        "status": {
            "ui:widget": "RadioWidget"
        }
    }
} as RJSFSchema;