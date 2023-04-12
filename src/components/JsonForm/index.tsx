import validator from "@rjsf/validator-ajv8";
import Form from '@rjsf/mui';
import { BaseInputTemplateProps, RJSFSchema, UiSchema, getInputProps } from "@rjsf/utils";
import { Container, FormWrapper, SubmitButton } from "./styles";
import { IChangeEvent } from "@rjsf/core";
import { Alert, AlertColor, Snackbar } from "@mui/material";
import styles from '../../../styles/Form.module.css'
import React, { ChangeEvent, FocusEvent } from "react";


interface Props {
  schema: RJSFSchema;
  uiSchema: UiSchema;
  // formData: JSONObject | CategoryCreationProps | ProductCreationProps | SubcategoryCreationProps;
  formData: JSONObject;
  onSubmit: (x: IChangeEvent) => void;
  openSnackbar: boolean;
  handleCloseSnackbar: () => void;
  alertMessage: { type: AlertColor, message: string };
  setFormData: (item: any) => void;
};

type JSONValue =
  | string
  | string[]
  | number
  | boolean
  | JSONObject

interface JSONObject {
  [x: string]: JSONValue;
}


export default function JsonForm({ schema, uiSchema, formData, setFormData, onSubmit, openSnackbar, handleCloseSnackbar, alertMessage }: Props) {


  function transformErrors(errors: any) {
    return errors.map((error: any) => {
      if (error.name === "required") {
        error.message = "Esse campo deve ser preenchido"
      }

      if (error.name === "pattern") {
        error.message = "Somente números "
      }
      return error;
    });
  }



  


  return (
    <Container>
      <FormWrapper>
        <Form
          id={styles.form}
          autoComplete="off"
          schema={schema}
          noHtml5Validate
          showErrorList={false}
          validator={validator}
          formData={formData}
          uiSchema={uiSchema}
          onSubmit={onSubmit}
          transformErrors={transformErrors} //customizar mensagem dos erros
        >
          <SubmitButton style={{ cursor: 'pointer' }}>Enviar</SubmitButton>
        </Form>
      </FormWrapper>
      <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleCloseSnackbar}>
        <Alert variant="filled" severity={alertMessage.type}>{alertMessage.message}</Alert>
      </Snackbar>
    </Container>
  );
}

