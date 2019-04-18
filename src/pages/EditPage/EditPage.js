import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import styled  from 'styled-components';
import Typography from "@material-ui/core/es/Typography/Typography";

import {actions} from "../../ducks/standup/standup";
import StandupForm from "../../components/StandupForm/StandupForm";
import {NO_ERRORS} from "../../config/constants";
import SimpleSpinner from "../../components/SimpleSpinner/SimpleSpinner";

const StyledEditPage = styled.div`
      width: 100%;
      height: 100%;
      padding-top: 25px;
      justify-content: center;
      align-items: center;
      display: flex;
      flex-direction: column;
`;

const EditPage = ({standup, getStandup, match, editStandup, history}) => {

    useEffect(() => {
        getStandup(match.params.name)
    }, []);

    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState(NO_ERRORS);

    const getInitialValues = () => {
        return {
            displayName: standup.displayName,
            url: standup.name,
            teams: standup.teams
        }
    };

    const saveStandup = editedStandup => {
        setSubmitting(true);
        const newStandup = {
            id: standup.id,
            name: standup.name,
            displayName: editedStandup.displayName,
            teams: editedStandup.teams.map(t => ({
                id: t.id, name: t.name,
                speaker: t.speaker, allocationInSeconds: t.allocationInSeconds
            }))
        };
        const onSuccess = () => {
            setSubmitting(false);
            setErrors(NO_ERRORS);
            history.push('/admin/' + match.params.name)
        };
        const onError = err => {
            setSubmitting(false);
            setErrors(err)
        };
        editStandup(newStandup, onSuccess, onError)
    };

    const getErrors = () => {
        if (errors === 422) return "Error parsing standup, ensure all names and speakers are alphanumeric characters and allocation in seconds is a number";
        else if (errors === 404) return "Error finding standup to edit in the database";
        else return "Unknown error. Contact Alan Hutcheson on Slack for help";
    };

    if (!standup.teams || standup.name !== match.params.name)
        return <SimpleSpinner size="100px"/>;

    return (
        <StyledEditPage>
            <Typography variant="h3" style={{ marginBottom: "20px" }}>
                Edit Standup Page
            </Typography>
            {errors !== NO_ERRORS &&
                <Typography variant="h6" align="center">
                    {getErrors(errors)}
                </Typography>
            }
            <StandupForm
                initialValues={getInitialValues()}
                onSubmit={s => saveStandup(s)}
                submitting={submitting}
            />
        </StyledEditPage>
    )
};

const mapStateToProps = state => (
    {
        standup: state.standup
    }
);

const mapDispatchToProps = dispatch => (
    {
        getStandup: name => dispatch(actions.getStandupByName(name)),
        editStandup: (s, success, err) => dispatch(actions.editStandup(s, success, err)),
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(EditPage);