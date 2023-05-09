import { ISchemaForm, TypeSchemaForm } from 'types/ISchemaForm'

export const UserFormSchema: ISchemaForm[] = [
    {
        name: 'id',
        required: false,
        label: 'id',
        props: {
            type: TypeSchemaForm.NUMBER,
            title: 'id',
        },
        uiSchema: {
            widget: 'hidden',
        },
    },
    {
        name: 'name',
        required: true,
        label: 'Nome',
        props: {
            type: TypeSchemaForm.STRING,
            title: 'Nome',
        },
        uiSchema: {
            options: {
                ui: 6,
            },
            widget: 'TextWidgetWithMask',
            autofocus: true,
        },
    },
    {
        name: 'email',
        required: true,
        label: 'Email',
        props: {
            type: TypeSchemaForm.STRING,
            title: 'Email',
        },
        uiSchema: {
            options: {
                ui: 6,
            },
            widget: 'TextWidgetWithMask',
        },
    },
    {
        name: 'cpf',
        required: true,
        label: 'CPF',
        props: {
            type: TypeSchemaForm.STRING,
            title: 'CPF',
        },
        uiSchema: {
            options: {
                mask: '999.999.999-99',
                ui: 6,
            },
            widget: 'TextWidgetWithMask',
        },
    },
    {
        name: 'phone',
        required: true,
        label: 'Telefone',
        props: {
            type: TypeSchemaForm.STRING,
            title: 'Telefone',
        },
        uiSchema: {
            options: {
                mask: '(99) 9 9999-9999',
                ui: 6,
            },
            widget: 'TextWidgetWithMask',
        },
    },
    {
        name: 'businesses',
        required: false,
        label: 'Empresas',
        props: {
            type: TypeSchemaForm.ARRAY,
            title: 'Empresas',
            items: {
                type: 'object',
                enum: [],
            },
            uniqueItems: true,
        },
        uiSchema: {
            options: {
                ui: 12,
            },
            widget: 'SelectWithCheckboxes',
        },
    },
]
