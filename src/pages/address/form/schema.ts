import { ISchemaForm, TypeSchemaForm } from 'types/ISchemaForm'

const AddressFormSchema: ISchemaForm[] = [
    {
        name: 'cep',
        required: true,
        label: 'Cep',
        props: {
            type: TypeSchemaForm.STRING,
            title: 'Cep',
        },
        uiSchema: {
            options: {
                mask: '99.999-999',
                ui: 4,
            },
            widget: 'TextWidgetWithMask',
            autofocus: false,
        },
    },
    {
        name: 'street',
        required: true,
        label: 'Rua',
        props: {
            type: TypeSchemaForm.STRING,
            title: 'Rua',
        },
        uiSchema: {
            options: {
                ui: 4,
            },
            autofocus: false,
            widget: 'TextWidgetWithMask',
        },
    },
    {
        name: 'number',
        required: true,
        label: 'Número',
        props: {
            type: TypeSchemaForm.STRING,
            title: 'Número',
        },
        uiSchema: {
            options: {
                ui: 4,
            },
            autofocus: false,
            widget: 'TextWidgetWithMask',
        },
    },
    {
        name: 'complement',
        required: false,
        label: 'Complemento',
        props: {
            type: TypeSchemaForm.STRING,
            title: 'Complemento',
        },
        uiSchema: {
            options: {
                ui: 3,
            },
            autofocus: false,
            widget: 'TextWidgetWithMask',
        },
    },
    {
        name: 'district',
        required: true,
        label: 'Bairro',
        props: {
            type: TypeSchemaForm.STRING,
            title: 'Bairro',
        },
        uiSchema: {
            options: {
                ui: 3,
            },
            autofocus: false,
            widget: 'TextWidgetWithMask',
        },
    },
    {
        name: 'city',
        required: true,
        label: 'Cidade',
        props: {
            type: TypeSchemaForm.STRING,
            title: 'Cidade',
        },
        uiSchema: {
            options: {
                ui: 3,
            },
            autofocus: false,
            widget: 'TextWidgetWithMask',
        },
    },
    {
        name: 'uf',
        required: true,
        label: 'Estado U.F',
        props: {
            type: TypeSchemaForm.STRING,
            title: 'Estado U.F',
        },
        uiSchema: {
            options: {
                ui: 3,
            },
            autofocus: false,
            widget: 'TextWidgetWithMask',
        },
    },
]

export default AddressFormSchema
