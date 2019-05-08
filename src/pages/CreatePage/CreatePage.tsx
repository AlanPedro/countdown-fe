import React, {useState} from 'react';
import { connect } from 'react-redux';
import styled  from 'styled-components';
import * as H from 'history';
import Typography from "@material-ui/core/es/Typography/Typography";

import {actions} from "../../ducks/team";
import TeamForm from "../../components/TeamForm/TeamForm";
import {NO_ERRORS} from "../../config/constants";
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import { SuccessErrorCallback, Team, TeamMember, TeamDto } from '../../../@types/countdown';

const StyledCreatePage = styled.div`
      width: 100%;
      height: 100%;
      padding-top: 25px;
      justify-content: center;
      align-items: center;
      display: flex;
      flex-direction: column;
`;

interface RouterProps {
    projectName: string;
}

interface IProps extends RouteComponentProps<RouterProps> {
    history: H.History
}
interface PropsFromDispatch {
    createTeam: (standup: TeamDto, meta: SuccessErrorCallback) => void;
}

const CreatePage: React.FunctionComponent<IProps & PropsFromDispatch> = ({createTeam, history}) => {

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

    // TODO: change to standup after all 'name' changed to slug/url
    const saveStandup = (standup: any) => {
        setSubmitting(true);
        const newStandup: Team = {
            id: 0, // Will be set by the backend
            name: standup.url,
            displayName: standup.displayName,
            members: standup.teams.map((t: TeamMember, i: number) => ({
                id: i, name: t.name,
                speaker: t.speaker, allocationInSeconds: t.allocationInSeconds
            }))
        };
        const onSuccess = () => {
            setSubmitting(false);
            setErrors(NO_ERRORS);
            history.push('/admin')
        };
        const onError = (err: number)  => {
            setSubmitting(false);
            setErrors(err)
        };
        const newTeam = {
            ...newStandup,
            teams: newStandup.members
        }
        createTeam(newTeam, { onSuccess, onError })
    };

    // TODO: Change to HTTP Error Code ENUM
    const getErrors = (errors: number) => {
        if (errors === 422) return "Error parsing standup, ensure all names and speakers are alphanumeric characters and allocation in seconds is a number";
        if (errors === 409) return "Team url is short name is taken, try a different name";
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
            <TeamForm
                onSubmit={(s: Team) => saveStandup(s)}
                submitting={submitting}
                initialValues={initialValues}
                isCreating={true}
            />
        </StyledCreatePage>
    )
};

const mapDispatchToProps = (dispatch: Dispatch) => (
    {
        createTeam: (s: TeamDto, meta: SuccessErrorCallback) => dispatch(actions.createTeam(s, meta)),
    }
);

export default connect(null, mapDispatchToProps)(CreatePage);