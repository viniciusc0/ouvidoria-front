import { CategoryGetProps } from "@/services/requests/Category/interfaces";

export const subcategory = 
    {
        
        "uiSchema" : {
            "description": {
                "ui:autofocus": true,
                "ui:placeholder" : "Digite a descrição da subcategoria"
            },
            "imageUrl": {
                "ui:placeholder" : "Digite a url da imagem"
            },
            "position": {
                "ui:placeholder" : "Digite a posição"
            },
            "category": {
                "ui:placeholder" : "Escolha a categoria"
            },
            "status": {
                "ui:widget": "RadioWidget"
            },
            "showInTopHome": {
                "ui:widget": "CheckboxWidget",
            }
        }
    }

export function subcategorySchema(categoriesArray: CategoryGetProps[], title: string){

    const categoriesNames = [] as string[];
    categoriesArray.forEach(category => {
        categoriesNames.push(category.description);
    });

    return {
        "title" : title,
        "description": "Subcategoria",
        "type": "object",
        "required": [
            "description",
            "imageUrl",
            "category",
            "status",
            "position",
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
            "category": {
                "title": "Categoria",
                "type": "string",
                "examples": categoriesNames
            },
            "position": {
                "type": "number",
                "title": "Posição"
            },
            "status": {
                "type": "boolean",
                "title" : "Status",
                "oneOf": [
                    {
                        "const": true,
                        "title": "Ativa"
                    },
                    {
                        "const": false, 
                        "title": "Inativa"
                    }
                ]
            },
            "showInTopHome": {
                "type": "boolean",
                "title": "Mostrar no topo",
            }
        },
    };
}

export const subcategoryFiltersJson = {
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
            offset: {
                type: "number",
                title: "Offset",
            },
            status: {
                type: "boolean",
                title: "Ativa",
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