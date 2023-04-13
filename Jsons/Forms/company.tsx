import { RJSFSchema } from "@rjsf/utils";

export const company =
{
    "schema": {
        "description": "Empresa",
        "type": "object",
        "required": [
            "corporate_name",
            "cnpj",
            "status",
            "opening_hours",
            "end_working_hours",
            "work_days",
            "cep",
            "public_place",
            "number",
            "neighborhood",
            "city",
            "state",
        ],
        "properties": {
            "corporate_name": {
                "type": "string",
                "title": "Razão social",
            },
            "commercial_name": {
                "type": "string",
                "title": "Nome fantasia",
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
            "opening_hours": {
                "type": "string",
                "title": "Horário de funcionamento (início)",
                "format": "time"
            },
            "end_working_hours": {
                "type": "string",
                "title": "Horário de funcionamento (término)",
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
            },
            "cep": {
                "type": "string",
                "title": "CEP",
            },
            "public_place": {
                "type": "string",
                "title": "Logradouro",
            },
            "number": {
                "type": "string",
                "title": "Número",
            },
            "neighborhood": {
                "type": "string",
                "title": "Bairro",
            },
            "city": {
                "type": "string",
                "title": "Cidade",
            },
            "state": {
                "type": "string",
                "title": "Estado",
            },
        }
    },
    "uiSchema": {
        "corporate_name": {
            "ui:autofocus": true,
            "ui:placeholder": "Digite a razão social da empresa"
        },
        "commercial_name": {
            "ui:autofocus": true,
            "ui:placeholder": "Digite o nome fantasia da empresa"
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
        "public_place": {
            "ui:placeholder": "Digite o logradouro"
        },
        "number": {
            "ui:placeholder": "Digite o número",
            "ui:widget" : "TextWidgetWithMask",
            'ui:options': {
                "mask": '999999999',
            },
        },
        "neighborhood": {
            "ui:placeholder": "Digite o bairro"
        },
        "city": {
            "ui:placeholder": "Digite a cidade"
        },
        "state": {
            "ui:placeholder": "Digite o estado"
        },
        "status": {
            "ui:widget": "RadioWidget"
        }
    }
} as RJSFSchema;