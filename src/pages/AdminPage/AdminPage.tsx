import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import { Dispatch } from 'redux';
import posed, { PoseGroup } from 'react-pose';
import * as H from 'history';
import { RouteComponentProps } from 'react-router';
import Divider from "@material-ui/core/es/Divider/Divider";

import './AdminPage.scss';
import { actions, StandupState } from '../../ducks/standup';
import AdminListItem from '../../components/AdminListItem/AdminListItem';
import LoadingBar from "../../components/LoadingBar/LoadingBar";
import CurrentCard from "../../components/CurrentCard/CurrentCard";
import AuthenticationPopup from "../../components/AuthenticationPopup/AuthenticationPopup";
import AdminControls from "../../components/AdminControls/AdminControls";
import SimpleSpinner from "../../components/SimpleSpinner/SimpleSpinner";
import { ApplicationState } from '../../ducks';
import {TeamState, actions as teamActions} from "../../ducks/team";

interface RouterProps {
    projectName: string;
    teamName: string;
}
interface IProps extends RouteComponentProps<RouterProps>{
    location: H.Location;
    history: H.History;
}
interface PropsFromState {
    standup: StandupState;
    team: TeamState;
}
interface PropsFromDispatch {
    startStandup: () => void,
    loadStandup: (name: string) => void,
    pauseStandup: () => void,
    nextSpeaker: () => void,
    unpauseStandup: () => void,
    leaveStandup: (name: string) => void,
    getTeamByName: (name: string) => void
}

const AdminPage: React.FunctionComponent<IProps & PropsFromState & PropsFromDispatch> = props => {

    useEffect(() => {
        const {teamName} = props.match.params;
        if (team.members.length < 1) props.getTeamByName(teamName)
        else props.loadStandup(teamName);
        return () => {
            props.leaveStandup(teamName);
        }
    }, [props.team]);

    const [authenticated, setAuthenticated] = useState(true);

    const start = () => {
        if (props.standup.live) props.unpauseStandup() ;
        else props.startStandup();
    };
    const pause = () => props.pauseStandup();
    const next = () => props.nextSpeaker();

    const { team, standup } = props;
    if (team.members.length < 1 || standup.currentTeam === "") return <SimpleSpinner />;
    const { members } = team;
    const { currentTeam, currentSpeaker, time } = standup;
    const teamsToCome = members.slice(members.findIndex(member => currentTeam === member.name) + 1);

    return (
        <React.Fragment>

            <AuthenticationPopup
                show={!authenticated}
                onAuthentication={() => setAuthenticated(true)}
            />

            <div id="blur-container" className="blur-container">
                <div className={`admin-page ${!authenticated ? "blurred" : ""}`}>
                    <CurrentCard
                        title={currentSpeaker}
                        subtitle={currentTeam}
                        sideIcon={time}
                    />
                    <div className="admin-page__next-teams">
                        <Divider />
                        <PoseGroup>
                            {
                                teamsToCome.map(team => (
                                        <PosedTeam key={team.name + " - " + team.speaker} className="next-teams__team">
                                            <AdminListItem id={team.id} name={team.speaker} time={team.allocationInSeconds}  />
                                            <Divider />
                                        </PosedTeam>
                                ))
                            }
                        </PoseGroup>
                    </div>
                    <div className="admin-page__bottom-bar">
                        <LoadingBar
                            allocation={team.members.find(member => member.name === standup.currentTeam)!.allocationInSeconds}
                            timeLeft={standup.time}
                        />
                        <AdminControls
                            paused={standup.paused}
                            onPause={pause}
                            onSkip={next}
                            onStart={start}
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};


const PosedTeam = posed.div({
    enter: { opacity : 1},
    exit: { opacity : 0},
});

const mapStateToProps = (state: ApplicationState) => (
    {
      standup: state.standup,
      team: state.team
    }
);

const mapDispatchToProps = (dispatch: Dispatch) => (
  {
    startStandup: () => dispatch(actions.startStandup()),
    loadStandup: (name: string) => dispatch(actions.loadStandup(name)),
    pauseStandup: () => dispatch(actions.pauseStandup()),
    nextSpeaker: () => dispatch(actions.toNextSpeaker()),
    unpauseStandup: () => dispatch(actions.unpauseStandup()),
    leaveStandup: (name: string) => dispatch(actions.leaveStandup(name)),
    getTeamByName: (name: string) => dispatch(teamActions.getTeamByName(name))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);