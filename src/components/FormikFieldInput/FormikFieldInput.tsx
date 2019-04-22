import React from 'react';
import TextField from "@material-ui/core/es/TextField";
import {camelToTitle} from "../../utils";
import { FieldProps } from 'formik';

const FormikFieldInput: React.FunctionComponent<FieldProps> = ({
                              field, // { name, value, onChange, onBlur }
                              form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                              ...props
                          }) => (
    <TextField
        {...field}
        {...props}
        label={camelToTitle(field.name)}
        error={touched[field.name] && errors[field.name] !== ""}
        helperText={touched[field.name] && errors[field.name] ? <span>{errors[field.name]}</span> : null}
    />
);
export default FormikFieldInput;