export enum TypeSchemaForm {
    'BOOLEAN' = 'boolean',
    'STRING' = 'string',
    'NUMBER' = 'number'
}

type IPropertiesSchema = {
    type: TypeSchemaForm
    title?: string
    className?: string
    oneOf?: any
}

type IOptionsUISchema = {
    mask: string
}

type IUISchema = {
    autofocus?: boolean
    placeholder?: string
    options?: IOptionsUISchema
    widget?: string
}

export type ISchemaForm = {
    name: string
    label: string
    required: boolean
    props: IPropertiesSchema
    uiSchema: IUISchema
}
