import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

import { TeamsState, actions as teamsActions } from '../../ducks/teams';
import { actions as teamActions } from '../../ducks/team';
import { ApplicationState } from '../../ducks';
import CountdownList from '../../components/CountdownList/CountdownList';
import ListItem from '../../components/ListItem/ListItem';
import NextButton from '../../assets/next-page-48x48.png';
import { TeamNames } from '../../../@types/countdown';
import SimpleSpinner from '../../components/SimpleSpinner/SimpleSpinner';
import CenteredContent from '../../components/CenteredContent/CenteredContent';

interface RouterProps {
    projectName: string;
    teamName: string;
}

interface IProps extends RouteComponentProps<RouterProps> {
}

interface PropsFromDispatch {
    getAllTeams: () => void;
    getTeamByName: (name: string) => void;
}

interface StateFromProps {
    teams: TeamsState;
}

const TeamPage: React.FunctionComponent<IProps & StateFromProps & PropsFromDispatch> = props => {

    useEffect(() => {
        if (props.teams.length === 0) props.getAllTeams();
        props.getTeamByName(props.match.params.teamName)
    }, []);

    const team: TeamNames | undefined = props.teams.find((t: TeamNames) => t.name === props.match.params.teamName);

    if (props.teams.length === 0)
        return <SimpleSpinner />;
    else if (team === undefined) 
        return <Redirect to={`/project/${props.match.params.projectName}`} />;

    const renderListItem = (to: string, text: string) => (
        <ListItem to={`${team.name}/${to}`}>
            <Typography variant="h5" color="inherit">
                {text}
            </Typography>
            <img src={NextButton} alt="Next button" style={{ height: "40px", width: "40px"}} />
        </ListItem>
    );


    return (
        <CenteredContent title={team.displayName}>
            <CountdownList>

                {renderListItem("standup", "Join standup")}
                {renderListItem("admin", "Run standup")}
                {renderListItem("edit", "Edit standup team")}
                
            </CountdownList>
        </CenteredContent>
    )
};

const mapStateToProps = (state: ApplicationState) => (
    {
        teams: state.teams
    }
);

const mapDispatchToProps = (dispatch: Dispatch) => (
    {
        getAllTeams: () => dispatch(teamsActions.getAllTeams()),
        getTeamByName: (name: string) => dispatch(teamActions.getTeamByName(name))
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(TeamPage);