import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import styled  from 'styled-components';
import * as H from 'history';
import { RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';
import Typography from "@material-ui/core/es/Typography/Typography";

import {actions} from "../../ducks/standup";
import StandupForm from "../../components/StandupForm/StandupForm";
import {NO_ERRORS} from "../../config/constants";
import SimpleSpinner from "../../components/SimpleSpinner/SimpleSpinner";
import { StandupWithRandomNumber, Standup, SuccessErrorCallback, TeamWithRandomNumber } from '../../../@types/countdown';
import { ApplicationState } from '../../ducks';

const StyledEditPage = styled.div`
      width: 100%;
      height: 100%;
      padding-top: 25px;
      justify-content: center;
      align-items: center;
      display: flex;
      flex-direction: column;
`;

interface RouterProps {
    name: string;
}
interface IProps extends RouteComponentProps<RouterProps> {
    history: H.History;
}
interface PropsFromState {
    standup: StandupWithRandomNumber
}
interface PropsFromDispatch {
    getStandup: (name: string) => void;
    editStandup: (standup: Standup, meta: SuccessErrorCallback) => void;
}

const EditPage: React.FunctionComponent<IProps & PropsFromState & PropsFromDispatch> = ({standup, getStandup, match, editStandup, history}) => {

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

    const saveStandup = (editedStandup: any) => {
        setSubmitting(true);
        const newStandup = {
            id: standup.id,
            name: standup.name,
            displayName: editedStandup.displayName,
            teams: editedStandup.teams.map((t: TeamWithRandomNumber) => ({
                id: t.id, name: t.name,
                speaker: t.speaker, allocationInSeconds: t.allocationInSeconds
            }))
        };
        const onSuccess = () => {
            setSubmitting(false);
            setErrors(NO_ERRORS);
            history.push('/admin/' + match.params.name)
        };
        const onError = (errorCode: number) => {
            setSubmitting(false);
            setErrors(errorCode)
        };
        editStandup(newStandup, { onSuccess, onError })
    };

    const getErrors = (code: number) => {
        if (code === 422) return "Error parsing standup, ensure all names and speakers are alphanumeric characters and allocation in seconds is a number";
        else if (code === 404) return "Error finding standup to edit in the database";
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
                onSubmit={(s: Standup) => saveStandup(s)}
                submitting={submitting}
                isCreating={false}
            />
        </StyledEditPage>
    )
};

const mapStateToProps = (state: ApplicationState) => (
    {
        standup: state.standup
    }
);

const mapDispatchToProps = (dispatch: Dispatch) => (
    {
        getStandup: (name: string) => dispatch(actions.getStandupByName(name)),
        editStandup: (s: Standup, meta: SuccessErrorCallback) => dispatch(actions.editStandup(s, meta)),
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(EditPage);