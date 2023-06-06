import AddressController from 'controllers/addressController'
import BusinessController from 'controllers/businessController'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { ApolloForm } from 'src/components'
import { formError } from 'src/components/JsonForm'
import {
    ApolloFormSchemaComponentType,
    ApolloFormSchemaCustomValues,
    ApolloFormSchemaItem,
} from 'src/components/apollo-form/ApolloForm.component'
import { removeMask } from 'src/utils/functions'
type BusinessNewEditForm = {
    values?: any
}

const NewEditForm = ({ values }: BusinessNewEditForm) => {
    const router = useRouter()
    const id = router.query.id

    const { enqueueSnackbar } = useSnackbar()

    const [customValues, setCustomValues] = useState<ApolloFormSchemaCustomValues[]>()

    const onSubmit = async data => {
        data.cnpj = removeMask(data.cnpj)
        data.contactPhone = removeMask(data.contactPhone)
        data.cep = removeMask(data.cep)

        let regex = /\d\d\d\d\d\d\d\d\d\d\d\d\d\d/i
        if (!regex.test(data.cnpj)) {
            enqueueSnackbar('CNPJ inválido!', { variant: 'error' })
            return
        }

        regex = /\d\d\d\d\d\d\d\d\d\d\d/i
        if (!regex.test(data.contactPhone)) {
            enqueueSnackbar('Telefone inválido!', { variant: 'error' })
            return
        }

        regex = /\d\d\d\d\d\d\d\d/i
        if (!regex.test(data.cep)) {
            enqueueSnackbar('CEP inválido!', { variant: 'error' })
            return
        }

        data = {
            ...data,
            address: {
                cep: data.cep,
                street: data.street,
                district: data.district,
                number: data.number,
                complement: data.complement,
                city: data.city,
                uf: data.uf,
            },
        }

        try {
            const businessController = new BusinessController()
            if (data.id) {
                await businessController.update(data.id, data)
                enqueueSnackbar('Oba! Empresa alterada com sucesso!', { variant: 'success' })
            } else {
                await businessController.create(data)
                enqueueSnackbar('Oba! Empresa criada com sucesso', { variant: 'success' })
            }
            router.push('/minhasempresas')
        } catch (error) {
            formError(error, enqueueSnackbar)
        }
    }

    const getAddressByCep = async (cep: string) => {
        try {
            const addressController = new AddressController()
            const res = await addressController.getCep(cep)
            setCustomValues([
                { name: 'cep', value: res.cep },
                { name: 'street', value: res.street },
                { name: 'district', value: res.district },
                { name: 'city', value: res.city },
                { name: 'uf', value: res.uf },
            ])
        } catch (error) {}
    }

    const BusinessFormSchema: ApolloFormSchemaItem[] = [
        {
            name: 'id',
            required: false,
            label: 'id',
            ui: { grid: 12 },
            componenttype: ApolloFormSchemaComponentType.HIDDEN,
        },
        {
            name: 'cnpj',
            required: true,
            label: 'CNPJ',
            componenttype: ApolloFormSchemaComponentType.TEXT,
            mask: '99.999.999/9999-99',
            ui: { grid: 6 },
        },
        {
            name: 'reasonName',
            required: true,
            label: 'Razão Social',
            componenttype: ApolloFormSchemaComponentType.TEXT,
            ui: { grid: 6 },
        },
        {
            name: 'fantasyName',
            required: false,
            label: 'Nome fantasia',
            componenttype: ApolloFormSchemaComponentType.TEXT,
            ui: { grid: 6 },
        },
        {
            name: 'contactName',
            required: false,
            label: 'Nome do contato',
            componenttype: ApolloFormSchemaComponentType.TEXT,
            ui: { grid: 6 },
        },
        {
            name: 'contactEmail',
            required: false,
            label: 'Email de contato',
            componenttype: ApolloFormSchemaComponentType.TEXT,

            ui: { grid: 6 },
        },
        {
            name: 'contactPhone',
            required: false,
            label: 'Celular de contato',
            mask: '(99)99999-9999',
            ui: { grid: 6 },
            componenttype: ApolloFormSchemaComponentType.TEXT,
        },
        {
            name: 'cep',
            required: true,
            label: 'Cep',
            mask: '99.999-999',
            componenttype: ApolloFormSchemaComponentType.TEXT,
            ui: { grid: 12 },
            onChange(e) {
                const cep = e.target.value
                const regex = /\d\d\.\d\d\d-\d\d\d/i
                if (regex.test(cep)) {
                    getAddressByCep(cep)
                }
            },
        },
        {
            name: 'street',
            required: true,
            label: 'Rua',
            componenttype: ApolloFormSchemaComponentType.TEXT,
            ui: { grid: 6 },
        },
        {
            name: 'number',
            required: true,
            label: 'Número',
            ui: { grid: 2 },
            componenttype: ApolloFormSchemaComponentType.TEXT,
        },
        {
            name: 'complement',
            required: false,
            label: 'Complemento',
            componenttype: ApolloFormSchemaComponentType.TEXT,
            ui: { grid: 4 },
        },
        {
            name: 'district',
            required: true,
            label: 'Bairro',
            componenttype: ApolloFormSchemaComponentType.TEXT,
            ui: { grid: 6 },
        },
        {
            name: 'city',
            componenttype: ApolloFormSchemaComponentType.TEXT,
            required: true,
            label: 'Cidade',
            ui: { grid: 6 },
        },
        {
            name: 'uf',
            required: true,
            label: 'Estado U.F',
            componenttype: ApolloFormSchemaComponentType.TEXT,
            ui: { grid: 6 },
        },
    ]

    return (
        <ApolloForm
            schema={BusinessFormSchema}
            initialValues={values}
            onSubmit={onSubmit}
            submitButtonText="Enviar"
            defaultExpandedGroup={true}
            isEdit
            customValues={customValues}
        />
    )
}

export default NewEditForm
