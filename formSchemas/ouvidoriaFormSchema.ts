import { ISchemaForm, TypeSchemaForm } from 'types/ISchemaForm'

export const OuvidoriaFormSchema: ISchemaForm[] = [
    {
        name: 'identification',
        required: false,
        label: 'Você deseja se identificar?',
        props: {
            type: TypeSchemaForm.ARRAY,
            title: 'Você deseja se identificar?',
            items: {
                // type: 'object',
                type: 'string',
                enum: ['Sim', 'Não'],
            },
            uniqueItems: true,
        },
        uiSchema: {
            options: {
                ui: 12,
            },
            widget: 'CustomSelect',
        },
    },
    {
        name: 'relation',
        required: true,
        label: 'Qual é a sua relação com a Patrus?',
        props: {
            type: TypeSchemaForm.ARRAY,
            title: 'Qual é a sua relação com a Patrus?',
            items: {
                // type: 'object',
                type: 'string',
                enum: ['Agregado', 'Cliente', 'Colaborador', 'Fornecedor', 'Prestador de serviços', 'Outros'],
            },
            uniqueItems: true,
        },
        uiSchema: {
            options: {
                ui: 6,
            },
            widget: 'CustomSelect',
        },
    },
    {
        name: 'ethicCode',
        required: true,
        label: 'Qual item do código de éticas este relato está infringindo? Link Código de ética',
        props: {
            type: TypeSchemaForm.STRING,
            title: 'Qual item do código de éticas este relato está infringindo? Link Código de ética?',
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
        name: 'company',
        required: true,
        label: 'Em qual empresa você trabalha?',
        props: {
            type: TypeSchemaForm.STRING,
            title: 'Em qual empresa você trabalha?',
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
        name: 'complaintType',
        required: true,
        label: 'Qual o tipo de denúncia você deseja relatar?',
        props: {
            type: TypeSchemaForm.ARRAY,
            title: 'Qual o tipo de denúncia você deseja relatar?',
            items: {
                // type: 'object',
                type: 'string',
                enum: [
                    'Assédio Sexual',
                    'Corrupção',
                    'Conflito de interesses',
                    'Fraude',
                    'Infração aos direitos humanos e discriminação',
                    'Roubos, furtos e qualquer destruição de ativos',
                    'Uso indevido de informações privilegiadas ou confidenciais',
                    'Conduta inadequada dos nossos motoristas de trânsito',
                    'Outros incidentes',
                ],
            },
            uniqueItems: true,
        },
        uiSchema: {
            options: {
                ui: 6,
            },
            widget: 'CustomSelect',
        },
    },
    {
        name: 'where',
        required: true,
        label: 'Onde ocorreu o incidente?',
        props: {
            type: TypeSchemaForm.STRING,
            title: 'Onde ocorreu o incidente?',
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
        name: 'when',
        required: true,
        label: 'Quando esse fato ocorreu?',
        props: {
            type: TypeSchemaForm.STRING,
            title: 'Quando esse fato ocorreu?',
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
        name: 'who',
        required: true,
        label: 'Quem cometeu o incidente? Informe o nome da pessoa e, se possível, mais detalhes como o sobrenome, área e cargo',
        props: {
            type: TypeSchemaForm.STRING,
            title: 'Quem cometeu o incidente? Informe o nome da pessoa e, se possível, mais detalhes como o sobrenome, área e cargo',
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
        name: 'continuity',
        required: true,
        label: 'Esse fato continua ocorrendo?',
        props: {
            type: TypeSchemaForm.ARRAY,
            title: 'Esse fato continua ocorrendo?',
            items: {
                // type: 'object',
                type: 'string',
                enum: ['Sim', 'Não', 'Talvez'],
            },
            uniqueItems: true,
        },
        uiSchema: {
            options: {
                ui: 6,
            },
            widget: 'CustomSelect',
        },
    },
    {
        name: 'witnesses',
        required: true,
        label: 'Havia testemunhas?',
        props: {
            type: TypeSchemaForm.ARRAY,
            title: 'Havia testemunhas?',
            items: {
                // type: 'object',
                type: 'string',
                enum: ['Sim', 'Não'],
            },
            uniqueItems: true,
        },
        uiSchema: {
            options: {
                ui: 12,
            },
            widget: 'CustomSelect',
        },
    },
    {
        name: 'certainty',
        required: true,
        label: 'Qual o grau de certeza sobre o fato que você está denunciando?',
        props: {
            type: TypeSchemaForm.ARRAY,
            title: 'Qual o grau de certeza sobre o fato que você está denunciando?',
            items: {
                // type: 'object',
                type: 'string',
                enum: ['Já ouvi dizer', 'Tenho a certeza', 'Tenho suspeitas'],
            },
            uniqueItems: true,
        },
        uiSchema: {
            options: {
                ui: 6,
            },
            widget: 'CustomSelect',
        },
    },
    {
        name: 'file',
        required: false,
        label: 'Caso você tenha evidências sobre o fato video, foto, documento etc) faça o upload do arquivo aqui o tamanho máximo do arquivo 1GB',
        props: {
            type: TypeSchemaForm.STRING,
            title: 'Caso você tenha evidências sobre o fato video, foto, documento etc) faça o upload do arquivo aqui o tamanho máximo do arquivo 1GB',
            format: 'data-url',
        },
        uiSchema: {},
    },
]

export const identificationArray: ISchemaForm[] = [
    {
        name: 'name',
        required: true,
        label: 'Nome',
        props: {
            type: TypeSchemaForm.STRING,
            title: 'Qual é o seu nome?',
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
        name: 'role',
        required: true,
        label: 'Cargo',
        props: {
            type: TypeSchemaForm.STRING,
            title: 'Qual é o seu cargo?',
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
        name: 'phone',
        required: true,
        label: 'Telefone',
        props: {
            type: TypeSchemaForm.STRING,
            title: 'Qual é o seu telefone?',
        },
        uiSchema: {
            options: {
                ui: 6,
                mask: '(99) 9 9999-9999',
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
            title: 'Qual é o seu email?',
        },
        uiSchema: {
            options: {
                ui: 6,
            },
            widget: 'TextWidgetWithMask',
            autofocus: true,
        },
    },
]

export const thereWereWitnesses = {
    name: 'witnessesNames',
    required: true,
    label: 'Cite o nome das testemunhas que estavam presentes',
    props: {
        type: TypeSchemaForm.STRING,
        title: 'Cite o nome das testemunhas que estavam presentes',
    },
    uiSchema: {
        options: {
            ui: 6,
        },
        widget: 'TextWidgetWithMask',
        autofocus: true,
    },
}

export const thereWerentWitnesses = {
    name: 'moreDetails',
    required: true,
    label: 'Por favor, descreva com o maior nível de detalhes possível o que aconteceu, indicando o(s) nome(s) da(s) pessoa(s) envolvida(s) entre outras informações que você julgar pertinentes. * 0/12.000 caracteres. Escreva o máximo de detalhes possível',
    props: {
        type: TypeSchemaForm.STRING,
        title: 'Por favor, descreva com o maior nível de detalhes possível o que aconteceu, indicando o(s) nome(s) da(s) pessoa(s) envolvida(s) entre outras informações que você julgar pertinentes. * 0/12.000 caracteres. Escreva o máximo de detalhes possível',
    },
    uiSchema: {
        options: {
            ui: 6,
        },
        widget: 'CustomTextarea',
        autofocus: true,
    },
}
