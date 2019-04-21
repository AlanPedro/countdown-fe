import React, {useState} from 'react';
import { connect } from 'react-redux';
import styled  from 'styled-components';
import Typography from "@material-ui/core/es/Typography/Typography";

import {actions} from "../../ducks/standup/standup";
import StandupForm from "../../components/StandupForm/StandupForm";
import {NO_ERRORS} from "../../config/constants";

const StyledCreatePage = styled.div`
      width: 100%;
      height: 100%;
      padding-top: 25px;
      justify-content: center;
      align-items: center;
      display: flex;
      flex-direction: column;
`;

const CreatePage = ({createStandup, history}) => {

    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState(NO_ERRORS);

    const initialValues = {
        displayName: "",
        url: "",
        teams: [
            { name: "", speaker: "", allocationInSeconds: 60 },
            { name: "", speaker: "", allocationInSeconds: 60 }
        ]
    };

    const saveStandup = standup => {
        setSubmitting(true);
        const newStandup = {
            id: 0, // Will be set by the backend
            name: standup.url,
            displayName: standup.displayName,
            teams: standup.teams.map((t, i) => ({
                id: i, name: t.name,
                speaker: t.speaker, allocationInSeconds: t.allocationInSeconds
            }))
        };
        const onSuccess = () => {
            setSubmitting(false);
            setErrors(NO_ERRORS);
            history.push('/admin')
        };
        const onError = err => {
            setSubmitting(false);
            setErrors(err)
        };
        createStandup(newStandup, onSuccess, onError)
    };

    const getErrors = () => {
        if (errors === 422) return "Error parsing standup, ensure all names and speakers are alphanumeric characters and allocation in seconds is a number";
        if (errors === 409) return "Standup url is short name is taken, try a different name";
        else return "Unknown error. Contact Alan Hutcheson on Slack for help";
    };

    return (
        <StyledCreatePage>
            <Typography variant="h3" style={{ marginBottom: "20px" }}>
                Create Standup Page
            </Typography>
            {errors !== NO_ERRORS && <Typography variant="h6" align="center">
                {getErrors(errors)}
            </Typography>}
            <StandupForm
                onSubmit={s => saveStandup(s)}
                submitting={submitting}
                initialValues={initialValues}
            />
        </StyledCreatePage>
    )
};

const mapDispatchToProps = dispatch => (
    {
        createStandup: (s, success, err) => dispatch(actions.createStandup(s, success, err)),
    }
);

export default connect(null, mapDispatchToProps)(CreatePage);