import AddressFormSchema from 'src/pages/address/form/schema'
import { ISchemaForm, TypeSchemaForm } from 'types/ISchemaForm'
const BusinessFormSchema: ISchemaForm[] = [
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
                mask: '999.999/9999-99',
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
            },
        },
    },
    ...AddressFormSchema,
]

export default BusinessFormSchema
