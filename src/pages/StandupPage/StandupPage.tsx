import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import * as H from 'history';
import { Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';

import Typography from "@material-ui/core/es/Typography/Typography";
import Button from "@material-ui/core/es/Button/Button";
import VolumeOff from "@material-ui/icons/VolumeOff";
import VolumeUp from "@material-ui/icons/VolumeUp";

import "./StandupPage.scss";
import { TeamMemberWithRandomNumber } from '../../../@types/countdown';
import { ApplicationState } from '../../ducks';
import { actions, StandupState } from "../../ducks/standup";
import { actions as teamActions } from "../../ducks/team";
import Sidebar from '../../components/Sidebar/Sidebar';
import LoadingBar from '../../components/LoadingBar/LoadingBar';
import Popup from "../../components/Popup/Popup";
import StandupCurrentSpeaker from "../../components/StandupCurrentSpeaker/StandupCurrentSpeaker";
import SimpleSpinner from "../../components/SimpleSpinner/SimpleSpinner";
import {TeamState} from "../../ducks/team";

const CountdownMP3 = require("../../assets/countdown.mp3");

interface PropsFromState {
    standup: StandupState;
    team: TeamState;
}
interface PropsFromDispatch {
    joinStandup: (name: string) => void;
    leaveStandup: (name: string) => void;
    getTeamByName: (name: string) => void;
}
interface RouterProps {
    projectName: string;
    teamName: string;
}

interface IProps extends RouteComponentProps<RouterProps> {
    location: H.Location;
    history: H.History;
}

const StandupPage: React.FunctionComponent<IProps & PropsFromState & PropsFromDispatch> = props => {

    useEffect(() => {
        const {teamName} = props.match.params;
        if (team.members.length < 1) props.getTeamByName(teamName)
        else props.joinStandup(teamName);
        return () => {
            props.leaveStandup(teamName);
        }
    }, [props.team]);

    const [audio, setAudio] = useState(false);
    const [joined, setJoined] = useState(false);
    const { standup, team } = props;
    if (team.members.length < 1 || standup.currentTeam === "") return <SimpleSpinner />;
    const currentTeam: TeamMemberWithRandomNumber = team.members.find(member =>
        member.name === standup.currentTeam && member.speaker === standup.currentSpeaker
    )!;
    return (
        <React.Fragment>
            <div className={`standup-page ${!joined ? "blurred" : ""}`}>
                 <Sidebar teams={team.members} current={currentTeam} />
                 <div className="standup-page__main-view">
                     <LoadingBar
                         allocation={currentTeam.allocationInSeconds}
                         timeLeft={standup.time}
                         backgroundImage={"linear-gradient(to right, rgba(79, 156, 248, 1), rgba(109, 222, 251, 1))"}
                     />
                     <Typography variant="h3" className="title">{team.displayName}</Typography>
                     <StandupCurrentSpeaker
                        speaker={currentTeam.speaker}
                        team={currentTeam.name}
                        time={standup.time}
                        number={currentTeam.randomNumber}
                     />
                     <div className="volume-icons" onClick={() => setAudio(!audio)}>
                        {
                            audio ?
                            <VolumeUp fontSize="inherit" /> 
                            : 
                            <VolumeOff fontSize="inherit" />
                        }
                     </div>
                 </div>
                 { standup.paused && standup.live &&
                 <div className="paused-cover">
                     PAUSED
                 </div>
                 }
                 {
                    standup.time <= 9 && !standup.paused && audio &&
                    <audio src={CountdownMP3} autoPlay />
                 }
            </div>
            
            <Popup show={!joined}>
                <Typography variant="h4"> {standup.live ? "Standup is live!" : "Standup is not live!"} </Typography>
                {standup.live ?
                    <Button onClick={() => setJoined(true)} variant="contained" color="primary"> Click here to
                        join </Button>
                    :
                    <Button onClick={() => window.location.reload()} variant="contained" color="primary"> Click here to
                        refresh and check </Button>
                }
            </Popup>
        </React.Fragment>
    )
};

const mapStateToProps = (state: ApplicationState) => (
    {
        standup: state.standup,
        team: state.team
    }
);

const mapDispatchToProps = (dispatch: Dispatch) => (
  {
    joinStandup: (name: string) => dispatch(actions.joinStandup(name)),
    leaveStandup: (name: string) => dispatch(actions.leaveStandup(name)),
    getTeamByName: (name: string) => dispatch(teamActions.getTeamByName(name))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(StandupPage);