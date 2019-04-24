import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import * as H from 'history';
import { Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';

import Typography from "@material-ui/core/es/Typography/Typography";
import Button from "@material-ui/core/es/Button/Button";
import VolumeOff from "@material-ui/icons/VolumeOff";
import VolumeUp from "@material-ui/icons/VolumeUp";

import Fireworks from "../../components/Fireworks/Fireworks";

import "./StandupPage.scss";
import { TeamWithRandomNumber } from '../../../@types/countdown';
import { ApplicationState } from '../../ducks';
import { actions, StandupState } from "../../ducks/standup";
import Sidebar from '../../components/Sidebar/Sidebar';
import LoadingBar from '../../components/LoadingBar/LoadingBar';
import Popup from "../../components/Popup/Popup";
import StandupCurrentSpeaker from "../../components/StandupCurrentSpeaker/StandupCurrentSpeaker";
import SimpleSpinner from "../../components/SimpleSpinner/SimpleSpinner";

const CountdownMP3 = require("../../assets/countdown.mp3");

interface PropsFromState {
    standup: StandupState;
}
interface PropsFromDispatch {
    joinStandup: (name: string) => void;
    leaveStandup: (name: string) => void;
}
interface RouterProps {
    name: string;
}

interface IProps extends RouteComponentProps<RouterProps> {
    location: H.Location;
    history: H.History;
}

const StandupPage: React.FunctionComponent<IProps & PropsFromState & PropsFromDispatch> = props => {

    useEffect(() => {
        props.joinStandup(props.match.params.name);
        return () => {
            props.leaveStandup(props.match.params.name);
        }
    }, []);

    const [audio, setAudio] = useState(false);
    const [joined, setJoined] = useState(false);
    const { standup } = props;
    if (standup.teams.length < 1) return <SimpleSpinner />;
    const currentTeam: TeamWithRandomNumber = standup.teams.find(team => 
        team.name === standup.currentTeam && team.speaker === standup.currentSpeaker
    )!;
    return (
        <React.Fragment>
            <div className={`standup-page ${!joined ? "blurred" : ""}`}>
                 <Sidebar teams={standup.teams} current={currentTeam} />
                 <div className="standup-page__main-view">
                     <LoadingBar
                         allocation={currentTeam.allocationInSeconds}
                         timeLeft={standup.time}
                         backgroundImage={"linear-gradient(to right, rgba(79, 156, 248, 1), rgba(109, 222, 251, 1))"}
                     />
                     <Typography variant="h3" className="title">{standup.displayName}</Typography>
                     <StandupCurrentSpeaker
                        speaker={currentTeam.speaker}
                        team={currentTeam.name}
                        time={standup.time}
                        number={currentTeam.randomNumber}
                     />
                     {
                        currentTeam.speaker === "Shiv" ?
                        <div style={{ position: "absolute"}}>
                            <div style={{ position: "absolute", display: "flex",
                              alignItems:"center", justifyContent: "center", height: "95vh", width: "75vw"
                              }}>
                                <Typography variant="h1">EV2 is LIVE!!!</Typography>
                            </div>
                        <Fireworks 
                            style={{ position: "absolute" }}
                            width={window.innerWidth * (3/4)} 
                            height={window.innerHeight - 75} 
                            background="rgba(0, 0, 0, 0.5)" 
                            maxFireworks={50}
                            maxSparks={10} /> 
                        </div>
                        : 
                        null
                     }
                     
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
      standup: state.standup
    }
);

const mapDispatchToProps = (dispatch: Dispatch) => (
  {
    joinStandup: (name: string) => dispatch(actions.joinStandup(name)),
    leaveStandup: (name: string) => dispatch(actions.leaveStandup(name))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(StandupPage);