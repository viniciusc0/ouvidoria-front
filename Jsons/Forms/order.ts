import { SubcategoryGetProps } from "@/services/requests/Subcategory/interfaces";

export const product =
{
    "uiSchema": {
        "description": {
            "ui:autofocus": true,
            "ui:placeholder": "Digite a descrição do produto"
        },
        "imageUrl": {
            "ui:placeholder": "Digite a url da imagem"
        },
        "subcategory": {
            "ui:placeholder": "Escolha a subcategoria"
        },
        "status": {
            "ui:widget": "RadioWidget"
        },
        "ean": {
            "ui:placeholder": "Digite os códigos de barras SEPARADOS POR VÍRGULA"
        }
    }
}



export function productSchema(subCategoriesArray: SubcategoryGetProps[], title: string) {

    const subCategoriesNames = [] as string[];
    subCategoriesArray.forEach(subCategory => {
        subCategoriesNames.push(subCategory.description);
    });


    return {
        "title": title,
        "description": "Produto",
        "type": "object",
        "required": [
            "description",
            "imageUrl",
            "subcategory",
            "status",
            "ean"
        ],
        "properties": {
            "description": {
                "type": "string",
                "title": "Descrição",
            },
            "imageUrl": {
                "type": "string",
                "title": "Url da imagem"
            },
            "ean": {
                "type": "string",
                "title": "Códigos de barras"
            },
            "subcategory": {
                "title": "Subcategoria",
                "type": "string",
                "examples": subCategoriesNames
            },
            "status": {
                "type": "boolean",
                "title": "Status",
                "oneOf": [
                    {
                        "const": true,
                        "title": "Ativo"
                    },
                    {
                        "const": false,
                        "title": "Inativo"
                    }
                ]
            },
        },
    };
}



export function getProductFiltersJson(subCategoriesArray: SubcategoryGetProps[]) {

    const subCategoriesNames = [] as string[];
    subCategoriesArray.forEach(subCategory => {
        subCategoriesNames.push(subCategory.description);
    });


    return {
        schema: {
            properties: {
                description: {
                    type: "string",
                    title: "Descrição",
                },
                limit: {
                    type: "number",
                    title: "Limite",
                },
                ean: {
                    type: "string",
                    title: "ean",
                },
                offset: {
                    type: "number",
                    title: "Offset",
                },
                subcategory: {
                    type: "string",
                    title: "Subcategoria",
                    examples: subCategoriesNames
                },
                status: {
                    type: "boolean",
                    title: "Ativo",
                    default: true
                },
            },
        },
        formData: {
        },
        uiSchema: {
            status: {
                "ui:widget": "CheckboxWidget",
            }
        }
    };
}