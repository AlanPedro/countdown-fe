import React from 'react';
import TextField from "@material-ui/core/es/TextField/TextField";
import {camelToTitle} from "../../utils";

const FieldArrayInput = ({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      index,
                      ...props
                  }) => {

    const fieldArrayName = field.name.split('.')[0];
    const fieldName = field.name.split('.')[field.name.split(".").length - 1];

    const hasError = () => { try { return touched[fieldArrayName][index][fieldName] && errors[fieldArrayName][index][fieldName] !== "" } catch { return false } };

    return (
        <TextField
            {...field}
            {...props}
            label={camelToTitle(fieldName)}
            error={hasError()}
            helperText={hasError() ? <span>{errors[fieldArrayName][index][fieldName]}</span> : null}
        />
    )
};

export default FieldArrayInput;