import validator from "@rjsf/validator-ajv8";
import Form from '@rjsf/mui';
import {  RJSFSchema, RegistryWidgetsType, UiSchema } from "@rjsf/utils";
import { Container, FormWrapper } from "./styles";
import { IChangeEvent } from "@rjsf/core";
import { Alert, AlertColor, Button, Snackbar } from "@mui/material";
import styles from '../../../styles/Form.module.css'
import React from "react";
import TextWidgetWithMask from "../TextWidgetWithMask";
import { UserCreationProps, UserGetProps } from "services/requests/user/interfaces";


interface Props {
  schema: RJSFSchema;
  uiSchema: UiSchema;
  // formData: JSONObject | ProductCreationProps | SubcategoryCreationProps;
  formData: JSONObject | UserCreationProps[];
  // onSubmit: (x: IChangeEvent) => void;
  onSubmit: () => void;
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


  const widgets: RegistryWidgetsType = {
    TextWidgetWithMask: TextWidgetWithMask,
  };

  function onChange(formItems: any) {
    setFormData(formItems.formData);
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
          // onSubmit={onSubmit}
          onChange={onChange}
          transformErrors={transformErrors} //customizar mensagem dos erros
          widgets={widgets}
        >
          <Button variant="contained" onClick={onSubmit}>Enviar</Button>
        </Form>
      </FormWrapper>
      <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleCloseSnackbar}>
        <Alert variant="filled" severity={alertMessage.type}>{alertMessage.message}</Alert>
      </Snackbar>
    </Container>
  );
}

