import React, { useEffect } from 'react';
import { RouteComponentProps, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Dispatch } from 'redux';
import { Typography } from '@material-ui/core';

import { ApplicationState } from '../../ducks';
import { actions, TeamsState } from '../../ducks/teams';
import CountdownList from '../../components/CountdownList/CountdownList';
import { TeamNames, ProjectNames } from '../../../@types/countdown';
import ListItem from '../../components/ListItem/ListItem';
import NextButton from '../../assets/next-page-48x48.png';
import SimpleSpinner from '../../components/SimpleSpinner/SimpleSpinner';
import { ProjectState, projectActions } from '../../ducks/projects';
import CenteredContent from '../../components/CenteredContent/CenteredContent';

interface RouterProps {
    projectName: string;
}

interface IProps extends RouteComponentProps<RouterProps> {
}

interface PropsFromDispatch {
    getAllTeams: () => void;
    getAllProjects: () => void;
}

interface PropsFromState {
    teams: TeamsState;
    projects: ProjectState;
}

const
    TeamsPage: React.FunctionComponent<IProps & PropsFromState & PropsFromDispatch> = props => {

    useEffect(() => {
        if (props.projects.length === 0) props.getAllProjects();
        props.getAllTeams()
    }, []);

    const project: ProjectNames | undefined =
        props.projects.find((p: ProjectNames) => p.name === props.match.params.projectName);

    if (props.projects.length === 0)
        return <SimpleSpinner />;
    else if (project === undefined) 
        return <Redirect to={`/project`} />;

    return (
        <CenteredContent title="Teams">
            <CountdownList>
                    {
                        props.teams.map((t: TeamNames, index: number) => (
                            <ListItem key={index} to={`${props.match.params.projectName}/${t.name}`}>
                                <Typography variant="h5" color="inherit">
                                    {t.displayName}
                                </Typography>
                                <img src={NextButton} alt="Next button" style={{ height: "40px", width: "40px"}} />
                            </ListItem>
                        ))
                    }
                </CountdownList>
                <Link to={`${props.match.params.projectName}/create`}>
                    <Typography align="center" variant="h5"> + Add a team</Typography>
                </Link>
        </CenteredContent>
    )
};

const mapStateToProps = (state: ApplicationState) => (
    {
        teams: state.teams,
        projects: state.projects
    }
);

const mapDispatchToProps = (dispatch: Dispatch) => (
    {
        getAllTeams: () => dispatch(actions.getAllTeams()),
        getAllProjects: () => dispatch(projectActions.getAllProjects())
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(TeamsPage);