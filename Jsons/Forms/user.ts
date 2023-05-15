import { RJSFSchema } from "@rjsf/utils";

export const user =
{
    "schema": {
        "description": "Usuário",
        "type": "object",
        "required": [
            "name", "cpf", "status", "role"
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
            "status": {
                "type": "boolean",
                "title": "Status",
                "oneOf": [
                    { "const": true, "title": "Ativo(a)" },
                    { "const": false, "title": "Inativo(a)" }
                ]
            },
            "role": {
                "title": "Tipo de usuário",
                "enumNames": [
                    'Administrador', 'Comum'
                ],
                "enum": [
                    {
                        "name": "Administrador",
                        "const": 'admin',
                    },
                    {
                        "name": "Comum",
                        "const": 'regular',
                    }
                ]
            }
        }
    },
    "uiSchema": {
        "name": {
            "ui:autofocus": true,
            "ui:placeholder": "Digite o nome do usuário"
        },
        "cpf": {
            "ui:placeholder": "Digite o cpf do usuário",
            'ui:widget': "TextWidgetWithMask",
            'ui:options': {
                mask: '999.999.999-99',
            },
        },
        "role": {
            "ui:widget": "RadioWidget"
        },
        "status": {
            "ui:widget": "RadioWidget"
        }
    }
} as RJSFSchema;


export const userFiltersJson = {
    "schema": {
        "properties": {
            "name": {
                "type": "string",
                "title": "Nome",
            },
            "cpf": {
                "type": "string",
                "title": "CPF",
            },
            "status": {
                "type": "boolean",
                "title": "Status",
                "oneOf": [
                    { "const": true, "title": "Ativo(a)" },
                    { "const": false, "title": "Inativo(a)" }
                ]
            },
            "role": {
                "title": "Tipo de usuário",
                "enumNames": [
                    'Administrador', 'Comum'
                ],
                "enum": [
                    {
                        "name": "Administrador",
                        "const": 'admin',
                    },
                    {
                        "name": "Comum",
                        "const": 'regular',
                    }
                ]
            }
        }
    },
    "uiSchema": {
        "name": {
            "ui:placeholder": "Digite o nome do usuário"
        },
        "cpf": {
            "ui:placeholder": "Digite o cpf do usuário",
            'ui:widget': "TextWidgetWithMask",
            'ui:options': {
                mask: '999.999.999-99',
            },
        },
        "role": {
            "ui:widget": "RadioWidget"
        },
        "status": {
            "ui:widget": "RadioWidget"
        }
    }
};




// export function subcategorySchema(categoriesArray: CategoryGetProps[], title: string){

//     const categoriesNames = [] as string[];
//     categoriesArray.forEach(category => {
//         categoriesNames.push(category.description);
//     });

//     return {
//         "title" : title,
//         "description": "Subcategoria",
//         "type": "object",
//         "required": [
//             "description",
//             "imageUrl",
//             "category",
//             "status",
//             "position",
//         ],
//         "properties": {
//             "description": {
//                 "type": "string",
//                 "title": "Descrição",
//             },
//             "imageUrl": {
//                 "type": "string",
//                 "title": "Url da imagem"
//             },
//             "category": {
//                 "title": "Categoria",
//                 "type": "string",
//                 "examples": categoriesNames
//             },
//             "position": {
//                 "type": "number",
//                 "title": "Posição"
//             },
//             "status": {
//                 "type": "boolean",
//                 "title" : "Status",
//                 "oneOf": [
//                     {
//                         "const": true,
//                         "title": "Ativa"
//                     },
//                     {
//                         "const": false, 
//                         "title": "Inativa"
//                     }
//                 ]
//             },
//             "showInTopHome": {
//                 "type": "boolean",
//                 "title": "Mostrar no topo",
//             }
//         },
//     };
// }

// export const subcategoryFiltersJson = {
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