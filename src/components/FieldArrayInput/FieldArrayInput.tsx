import React from 'react';
import TextField from "@material-ui/core/es/TextField/TextField";
import {camelToTitle} from "../../utils";
import { FormikState, FieldProps } from 'formik';

interface IProps {
    index: number;
}

const FieldArrayInput: React.FunctionComponent<IProps & FieldProps> = ({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      index,
                      ...props
                  }) => {

    const fieldArrayName = field.name.split('.')[0];
    const fieldName = field.name.split('.')[field.name.split(".").length - 1];

    // Hack to get array inputs working with errors
    // TODO: Fix this with better implementation
    const hasError = () => {
        try {
            return (touched as any)[fieldArrayName][index][fieldName] &&
             (errors as any)[fieldArrayName][index][fieldName] !== ""
        } catch {
            return false 
        }
    };

    return (
        <TextField
            {...field}
            {...props}
            label={camelToTitle(fieldName)}
            error={hasError()}
            helperText={hasError() ? <span>{(errors as any)[fieldArrayName][index][fieldName]}</span> : null}
        />
    )
};

export default FieldArrayInput;