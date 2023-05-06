export enum TypeSchemaForm {
    'BOOLEAN' = 'boolean',
    'STRING' = 'string',
    'NUMBER' = 'number',
}

type IPropertiesSchema = {
    type: TypeSchemaForm
    title?: string
    classNames?: string
    items?: any
    enum?: any
    oneOf?: any
}

type IOptionsUISchema = {
    mask?: string
    ui: number
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
