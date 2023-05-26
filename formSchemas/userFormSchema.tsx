import { ApolloFormSchemaItem } from 'src/components'
import { ApolloFormSchemaComponentType } from 'src/components/apollo-form/ApolloForm.component'

export const UserFormSchema: ApolloFormSchemaItem[] = [
    {
        name: 'id',
        required: false,
        label: 'id',
        componenttype: ApolloFormSchemaComponentType.HIDDEN,
        ui: { grid: 12 },
    },
    {
        name: 'name',
        required: true,
        label: 'Nome',
        componenttype: ApolloFormSchemaComponentType.TEXT,
        ui: { grid: 6 },
    },
    {
        name: 'email',
        required: true,
        label: 'Email',
        componenttype: ApolloFormSchemaComponentType.TEXT,
        ui: { grid: 6 },
    },
    {
        name: 'cpf',
        required: true,
        label: 'CPF',
        componenttype: ApolloFormSchemaComponentType.TEXT,
        mask: '999.999.999-99',
        ui: { grid: 6 },
    },
    {
        name: 'phone',
        required: true,
        label: 'Telefone',
        componenttype: ApolloFormSchemaComponentType.TEXT,
        mask: '(99) 9 9999-9999',
        ui: { grid: 6 },
    },
]

export const UserFiltersFormSchema: ApolloFormSchemaItem[] = [
    {
        name: 'name',
        required: false,
        label: 'Nome',
        componenttype: ApolloFormSchemaComponentType.TEXT,
        ui: { grid: 6 },
    },
    {
        name: 'email',
        required: false,
        label: 'Email',
        componenttype: ApolloFormSchemaComponentType.TEXT,
        ui: { grid: 6 },
    },
]
