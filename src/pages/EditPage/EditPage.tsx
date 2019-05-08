import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import styled  from 'styled-components';
import * as H from 'history';
import { RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';
import Typography from "@material-ui/core/es/Typography/Typography";

import {actions} from "../../ducks/team";
import TeamForm from "../../components/TeamForm/TeamForm";
import {NO_ERRORS} from "../../config/constants";
import SimpleSpinner from "../../components/SimpleSpinner/SimpleSpinner";
import { TeamWithRandomNumber, Team, SuccessErrorCallback, TeamMemberWithRandomNumber, TeamDto } from '../../../@types/countdown';
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
    teamName: string;
    projectName: string;
}
interface IProps extends RouteComponentProps<RouterProps> {
    history: H.History;
}
interface PropsFromState {
    team: TeamWithRandomNumber
}
interface PropsFromDispatch {
    getTeam: (name: string) => void;
    editTeam: (team: TeamDto, meta: SuccessErrorCallback) => void;
}

const EditPage: React.FunctionComponent<IProps & PropsFromState & PropsFromDispatch> = ({team, getTeam, match, editTeam, history}) => {

    useEffect(() => {
        getTeam(match.params.teamName)
    }, []);

    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState(NO_ERRORS);

    const getInitialValues = () => {
        return {
            displayName: team.displayName,
            url: team.name,
            teams: team.members
        }
    };

    const saveTeam = (editedTeam: any) => {
        setSubmitting(true);
        const newTeam: TeamDto = {
            id: team.id,
            name: team.name,
            displayName: editedTeam.displayName,
            teams: editedTeam.teams.map((t: TeamMemberWithRandomNumber) => ({
                id: t.id, name: t.name,
                speaker: t.speaker, allocationInSeconds: t.allocationInSeconds
            }))
        };
        const onSuccess = () => {
            setSubmitting(false);
            setErrors(NO_ERRORS);
            history.push('/admin/' + match.params.teamName)
        };
        const onError = (errorCode: number) => {
            setSubmitting(false);
            setErrors(errorCode)
        };
        editTeam(newTeam, { onSuccess, onError })
    };

    const getErrors = (code: number) => {
        if (code === 422) return "Error parsing team, ensure all names and speakers are alphanumeric characters and allocation in seconds is a number";
        else if (code === 404) return "Error finding team to edit in the database";
        else return "Unknown error. Contact Alan Hutcheson on Slack for help";
    };

    if (!team.members || team.name !== match.params.teamName)
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
            <TeamForm
                initialValues={getInitialValues()}
                onSubmit={(s: Team) => saveTeam(s)}
                submitting={submitting}
                isCreating={false}
            />
        </StyledEditPage>
    )
};

const mapStateToProps = (state: ApplicationState) => (
    {
        team: state.team
    }
);

const mapDispatchToProps = (dispatch: Dispatch) => (
    {
        getTeam: (name: string) => dispatch(actions.getTeamByName(name)),
        editTeam: (t: TeamDto, meta: SuccessErrorCallback) => dispatch(actions.editTeam(t, meta)),
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(EditPage);