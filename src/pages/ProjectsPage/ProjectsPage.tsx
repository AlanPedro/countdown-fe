import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../ducks';
import { Dispatch } from 'redux';
import { ProjectState, projectActions } from '../../ducks/projects';
import CountdownList from '../../components/CountdownList/CountdownList';
import ListItem from '../../components/ListItem/ListItem';
import { ProjectNames } from '../../../@types/countdown';
import { Typography } from '@material-ui/core';
import NextButton from '../../assets/next-page-48x48.png';
import CenteredContent from '../../components/CenteredContent/CenteredContent';

interface PropsFromState {
    projects: ProjectState
}

interface PropsFromDispatch {
    getAllProjects: () => void;
}

const ProjectsPage: React.FunctionComponent<PropsFromState & PropsFromDispatch> = props => {

    useEffect(() => {
        props.getAllProjects()
    }, []);

    return (
        <CenteredContent title="Projects">
            <CountdownList>
                {
                    props.projects.map((p: ProjectNames, index: number) => (
                        <ListItem key={index} to={`project/${p.name}`}>
                            <Typography variant="h5" color="inherit">
                                {p.displayName}
                            </Typography>
                            <img src={NextButton} alt="Next button" style={{ height: "40px", width: "40px"}} />
                        </ListItem>
                    ))
                }
            </CountdownList>
            <Typography align="center" variant="h5"> Want to add your project? Contact Alan Hutcheson on DD Slack </Typography>
        </CenteredContent>
    )
};

const mapStateToProps = (state: ApplicationState) => (
    {
        projects: state.projects
    }
);

const mapDispatchToProps = (dispatch: Dispatch) => (
    {
        getAllProjects: () => dispatch(projectActions.getAllProjects())
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsPage);
