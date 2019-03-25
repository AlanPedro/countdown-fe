import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import posed, { PoseGroup } from 'react-pose';
import PlayArrow from '@material-ui/icons/PlayArrowRounded';
import SkipNext from '@material-ui/icons/SkipNextRounded';
import Pause from '@material-ui/icons/PauseRounded';
import Divider from "@material-ui/core/es/Divider/Divider";
import _ from 'lodash';

import './AdminPage.scss';
import { actions } from '../../ducks/standup/standup';
import AdminListItem from '../../components/AdminListItem/AdminListItem';
import LoadingBar from "../../components/LoadingBar/LoadingBar";
import CurrentCard from "../../components/CurrentCard/CurrentCard";
import AuthenticationPopup from "../../components/AuthenticationPopup/AuthenticationPopup";


const AdminPage = props => {

    useEffect(() => {
        props.initialiseStandup(props.match.params.name);

        // WillUnmount
        return () => {
            props.leaveStandup(props.match.params.name);
        }
    }, []);

    const [paused, setPause] = useState(true);
    const [started, setStarted] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);

    const start = () => {
        if (started) {
            props.unpauseStandup()
        } else {
            setStarted(true);
            props.startStandup();
        }
        setPause(false);
    };

    const pause = () => {
        setPause(true);
        props.pauseStandup()
    };

    const next = () => {
        setPause(false);
        props.nextSpeaker();
    };

    const { standup } = props;
    if (_.isEmpty(standup)) return <h1>Loading...</h1>;
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
                            height="10px"
                            className="admin-page__loading-bar"
                        />
                        <div className="admin-page__buttons">
                            {
                                paused ?
                                    <PlayArrow fontSize="inherit" onClick={() => start()} />
                                    :
                                    <Pause fontSize="inherit" onClick={() => pause()} />
                            }
                            <SkipNext fontSize="inherit" onClick={() => next()} />
                        </div>
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
    initialiseStandup: name => dispatch(actions.loadStandup(name)),
    startStandup: () => dispatch(actions.startStandup()),
    pauseStandup: () => dispatch(actions.pauseStandup()),
    nextSpeaker: () => dispatch(actions.toNextSpeaker()),
    unpauseStandup: () => dispatch(actions.unpauseStandup()),
    leaveStandup: name => dispatch(actions.leaveStandup(name))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);