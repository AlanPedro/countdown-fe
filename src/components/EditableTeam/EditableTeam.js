import React from 'react';
import * as Formik from "formik";
import styled from 'styled-components';
import Button from "@material-ui/core/es/Button";

import FieldArrayInput from "../FieldArrayInput/FieldArrayInput";
import ArrowDropDownRounded from "@material-ui/icons/ArrowDropDownRounded";
import ArrowDropUpRounded from "@material-ui/icons/ArrowDropUpRounded";

const StyledEditableTeam = styled.div`
    display: flex;
    margin: 2px 0;
    display: -webkit-flex;
    display: flex;
    border: 1px solid grey;
    border-radius: 5px;
    padding: 5px;
    background: rgba(34, 94, 227, 0.1);
    & > div {
      margin: 0 15px;
    }
`;

const StyledArrows = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    & > svg {
        cursor: pointer;
        border: 1px solid black;
        border-radius: 5px;
        &:hover {
            background: purple;
        }
        &:first-child {
            margin-bottom: 2px;
        }
        &:last-child {
            margin-top: 2px;
        }
    }
`;

const EditableTeam = ({team, index, onDelete, onMoveUp, onMoveDown, arrayLength}) => (
    <StyledEditableTeam>
        <StyledArrows>
            {index > 0 ? <ArrowDropUpRounded onClick={onMoveUp} /> : null}
            {index < arrayLength - 1 ? <ArrowDropDownRounded onClick={onMoveDown} /> : null}
        </StyledArrows>
        <Formik.Field name={`teams.${index}.name`} component={FieldArrayInput} index={index} />
        <Formik.Field name={`teams.${index}.speaker`} component={FieldArrayInput} index={index} />
        <Formik.Field type="number" name={`teams.${index}.allocationInSeconds`} component={FieldArrayInput} index={index} />
        <Button variant="contained" color="secondary" onClick={() => onDelete(index)}>X</Button>
    </StyledEditableTeam>
);

export default EditableTeam;