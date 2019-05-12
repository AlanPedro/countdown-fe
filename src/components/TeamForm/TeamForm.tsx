import React from 'react';
import * as Yup from "yup";
import styled from "styled-components";
import * as Formik from "formik";
import Button from "@material-ui/core/es/Button";

import EditableTeam from "../EditableTeam/EditableTeam";
import FormikFieldInput from "../FormikFieldInput/FormikFieldInput";
import { TeamMemberWithRandomNumber } from '../../../@types/countdown';
import {DEFAULT_ID} from '../../config/constants';

const StyledForm = styled(Formik.Form)`
    overflow-x: scroll;
    display: flex;
    flex-direction: column;
    padding: 0 20px;

    .standup-form-add-team {
      margin: 10px;
    }

    .standup-form-submit {
      margin: 20px 0;
      align-self: center;
    }

    .editable-standup-name-container {
        display: flex;
        text-align: center;
        justify-content: center;
        & > div {
            font-size: 1.5em;
            width: 75%;
        }
    }
`;

interface IProps {
    initialValues: any;
    onSubmit: (values: any) => void;
    submitting: boolean;
    isCreating: boolean;
}

const TeamForm: React.FunctionComponent<IProps> = ({initialValues, onSubmit, submitting, isCreating}) => {
    return (
        <Formik.Formik
            initialValues={initialValues}
            validationSchema={editStandupSchema}
            onSubmit={values => onSubmit(values)}
            // Submit to store actions -> Edit and save in JSON
            render={ ({ values }) => (
                <StyledForm>
                    <div className="editable-standup-name-container">
                        <Formik.Field name={"displayName"} component={FormikFieldInput} />
                        <Formik.Field name={"url"} component={FormikFieldInput} disabled={!isCreating} />
                    </div>
                    <Formik.FieldArray name="teams">
                            {arrayHelpers => (
                                <React.Fragment>
                                    {values.teams !== undefined ? values.teams.map((team: TeamMemberWithRandomNumber, index: number) => (
                                        <EditableTeam
                                            key={index}
                                            team={team}
                                            index={index}
                                            arrayLength={values.teams.length}
                                            onDelete={() => arrayHelpers.remove(index)}
                                            onMoveDown={() => arrayHelpers.swap(index, index + 1)}
                                            onMoveUp={() => arrayHelpers.swap(index, index - 1)}
                                        />
                                        )) : null
                                    }
                                    <Button
                                        className="standup-form-add-team"
                                        onClick={() => arrayHelpers.push(
                                            { id: DEFAULT_ID, name: '', speaker: '', allocationInSeconds: 60}
                                        )}
                                        variant="contained"
                                        color="default">
                                        Add another team
                                    </Button>
                                </React.Fragment>
                            )}
                    </Formik.FieldArray>
                    <Button className="standup-form-submit" variant="contained"
                            color="primary" type="submit"
                            disabled={submitting}
                    >
                        Submit
                    </Button>
                </StyledForm>
            )}
        />
    )
};

const editStandupSchema = Yup.object().shape({
    displayName: Yup.string()
        .min(2, 'Team name must be between 2 & 50 characters)')
        .max(50, 'Team name must be between 2 & 50 characters)')
        .required('Team name is required'),
    url: Yup.string()
        .min(2, 'Url must be between 2 & 4 characters')
        .max(4, 'Url name must be between 2 & 4 characters')
        .required('Url is required'),
    teams: Yup.array().of(
        Yup.object().shape({
            name: Yup.string()
                .min(2, 'TeamMember name too short (must be more than 2 characters)')
                .max(50, 'TeamMember name too long (must be less than 50 characters)')
                .required('TeamMember name is required'),
            speaker: Yup.string()
                .min(2, 'Speaker name too short (must be more than 2 characters)')
                .max(50, 'Speaker name too long (must be less than 50 characters)')
                .required('Speaker name is required'),
            allocationInSeconds: Yup.number()
                .min(10, 'Minimum seconds is 10')
                .required('Time allocation is required')
        })
    )
});

export default TeamForm;