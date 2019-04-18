import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import posed, { PoseGroup } from 'react-pose';

import Divider from "@material-ui/core/es/Divider/Divider";
import _ from 'lodash';

import './AdminPage.scss';
import { actions } from '../../ducks/standup/standup';
import AdminListItem from '../../components/AdminListItem/AdminListItem';
import LoadingBar from "../../components/LoadingBar/LoadingBar";
import CurrentCard from "../../components/CurrentCard/CurrentCard";
import AuthenticationPopup from "../../components/AuthenticationPopup/AuthenticationPopup";
import AdminControls from "../../components/AdminControls/AdminControls";
import SimpleSpinner from "../../components/SimpleSpinner/SimpleSpinner";

const AdminPage = props => {

    useEffect(() => {
        props.loadStandup(props.match.params.name);
        return () => {
            props.leaveStandup(props.match.params.name);
        }
    }, []);

    const [authenticated, setAuthenticated] = useState(true);

    const start = () => props.standup.live ? props.unpauseStandup() : props.startStandup();
    const pause = () => props.pauseStandup();
    const next = () => props.nextSpeaker();

    const { standup } = props;
    if (_.isEmpty(standup)) return <SimpleSpinner />;
    const { teams, currentTeam, currentSpeaker, time } = standup;
    const teamsToCome = teams.slice(teams.findIndex(team => currentTeam === team.name) + 1);

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
                            allocation={standup.teams.find(team => team.name === standup.currentTeam).allocationInSeconds}
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

const mapStateToProps = state => (
    {
      standup: state.standup
    }
);

const mapDispatchToProps = dispatch => (
  {
    startStandup: () => dispatch(actions.startStandup()),
    loadStandup: name => dispatch(actions.loadStandup(name)),
    pauseStandup: () => dispatch(actions.pauseStandup()),
    nextSpeaker: () => dispatch(actions.toNextSpeaker()),
    unpauseStandup: () => dispatch(actions.unpauseStandup()),
    leaveStandup: name => dispatch(actions.leaveStandup(name))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);