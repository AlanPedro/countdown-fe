import React from 'react';
import TextField from "@material-ui/core/es/TextField";
import {camelToTitle} from "../../utils";

const FormikFieldInput = ({
                              field, // { name, value, onChange, onBlur }
                              form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                              ...props
                          }) => (
    <React.Fragment>
        <TextField
            {...field}
            label={camelToTitle(field.name)}
            error={touched[field.name] && errors[[field.name]] !== ""}
            helperText={touched[field.name] && errors[field.name] ? <span>{errors[field.name]}</span> : null}
        />
    </React.Fragment>
);
export default FormikFieldInput;