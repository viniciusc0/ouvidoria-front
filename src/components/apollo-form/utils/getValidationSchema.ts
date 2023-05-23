import * as Yup from 'yup'
import { ApolloFormSchemaComponentType, ApolloFormSchemaItem } from '../ApolloForm.component'

export const getValidationSchema = (schema: ApolloFormSchemaItem[]): any => {
  const validationObject = schema.reduce((acc: any, val: ApolloFormSchemaItem): any => {
    let validationType

    switch (val.componenttype) {

      case ApolloFormSchemaComponentType.TEXT:
      case ApolloFormSchemaComponentType.SELECT:
      case ApolloFormSchemaComponentType.RADIOGROUP:
        validationType = Yup.string();
        break;
      case ApolloFormSchemaComponentType.CHECKBOX:
      case ApolloFormSchemaComponentType.TEXTAREA:
      case ApolloFormSchemaComponentType.NUMBER:
        validationType = Yup.string();
        break;
      case ApolloFormSchemaComponentType.CURRENCY:
      case ApolloFormSchemaComponentType.PERCENTAGE:
      case ApolloFormSchemaComponentType.DATE:
        validationType = Yup.string();
        break;
      case ApolloFormSchemaComponentType.DATETIME:
        validationType = Yup.string();
        break;
      case ApolloFormSchemaComponentType.EMAIL:
      case ApolloFormSchemaComponentType.DECIMAL:
      case ApolloFormSchemaComponentType.PASSWORD:
      case ApolloFormSchemaComponentType.SWITCH:
        validationType = Yup.string();
        break;
      case ApolloFormSchemaComponentType.SELECTSEARCH:
      default:
        validationType = null;
    }

    if (val.required && validationType) {
      validationType = validationType.required(`${val.label} é obrigatório`)
    }

    return { ...acc, ...(validationType && { [val.name]: validationType }) }
  }, {} as any)

  return Yup.object().shape(validationObject)
}