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
            autofocus: false,
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
            autofocus: false,
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
            autofocus: false,
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
            autofocus: false,
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
            autofocus: false,
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
            autofocus: false,
        },
    },
]

export default AddressFormSchema
