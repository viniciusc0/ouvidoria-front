import { AddressFormSchema } from 'formSchemas/addressFormSchema'
import { ISchemaForm, TypeSchemaForm } from 'types/ISchemaForm'
const BusinessFormSchema: ISchemaForm[] = [
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
        name: 'cnpj',
        required: true,
        label: 'CNPJ',
        props: {
            type: TypeSchemaForm.STRING,
            title: 'CNPJ',
        },
        uiSchema: {
            options: {
                mask: '99.999.999/9999-99',
                ui: 6,
            },
            widget: 'TextWidgetWithMask',
            autofocus: true,
        },
    },
    {
        name: 'reasonName',
        required: true,
        label: 'Razão Social',
        props: {
            type: TypeSchemaForm.STRING,
            title: 'Razão Social',
        },
        uiSchema: {
            options: {
                ui: 6,
            },
            autofocus: false,
        },
    },
    {
        name: 'fantasyName',
        required: false,
        label: 'Nome fantasia',
        props: {
            type: TypeSchemaForm.STRING,
            title: 'Nome fantasia',
        },
        uiSchema: {
            options: {
                ui: 6,
            },
            widget: 'TextWidgetWithMask',
            autofocus: false,
        },
    },
    {
        name: 'contactName',
        required: false,
        label: 'Nome de contato',
        props: {
            type: TypeSchemaForm.STRING,
            title: 'Nome de contato',
        },
        uiSchema: {
            options: {
                ui: 6,
            },
            widget: 'TextWidgetWithMask',
            autofocus: false,
        },
    },
    {
        name: 'contactEmail',
        required: false,
        label: 'Email de contato',
        props: {
            type: TypeSchemaForm.STRING,
            title: 'Email de contato',
        },
        uiSchema: {
            options: {
                ui: 6,
            },
            widget: 'TextWidgetWithMask',
            autofocus: false,
        },
    },
    {
        name: 'contactPhone',
        required: false,
        label: 'celular de contato',
        props: {
            type: TypeSchemaForm.STRING,
            title: 'Celular de contato',
        },
        uiSchema: {
            autofocus: false,
            options: {
                mask: '(99) 9 9999-9999',
                ui: 6,
            },
            widget: 'TextWidgetWithMask',
        },
    },
    ...AddressFormSchema,
]

const BusinessFilterFormSchema: ISchemaForm[] = [
    {
        name: 'cnpj',
        required: false,
        label: 'CNPJ',
        props: {
            type: TypeSchemaForm.STRING,
            title: 'CNPJ',
        },
        uiSchema: {
            options: {
                mask: '99.999.999/9999-99',
                ui: 4,
            },
            widget: 'TextWidgetWithMask',
        },
    },
    {
        name: 'reasonName',
        required: false,
        label: 'Razão Social',
        props: {
            type: TypeSchemaForm.STRING,
            title: 'Razão Social',
        },
        uiSchema: {},
    },
    {
        name: 'status',
        required: false,
        label: 'Status',
        props: {
            type: TypeSchemaForm.BOOLEAN,
            oneOf: [
                { const: true, title: 'Ativo(a)' },
                { const: false, title: 'Inativo(a)' },
            ],
        },
        uiSchema: {
            widget: 'select',
        },
    },
]

export { BusinessFilterFormSchema, BusinessFormSchema }
