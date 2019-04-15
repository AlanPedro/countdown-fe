import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import Typography from "@material-ui/core/es/Typography/Typography";
import Button from "@material-ui/core/es/Button/Button";

import "./StandupPage.scss";
import { actions } from "../../ducks/standup/standup";
import Sidebar from '../../components/Sidebar/Sidebar';
import LoadingBar from '../../components/LoadingBar/LoadingBar';
import Popup from "../../components/Popup/Popup";
import StandupCurrentSpeaker from "../../components/StandupCurrentSpeaker/StandupCurrentSpeaker";


const StandupPage = props => {

    useEffect(() => {
        props.joinStandup(props.match.params.name);
        return () => {
            props.leaveStandup(props.match.params.name);
        }
    }, []);

    const [joined, setJoined] = useState(false);
    const { standup } = props;
    if (!standup.teams) return <h1 style={{ textAlign: "center" }}> Loading... </h1>;
    return (
        <React.Fragment>
            <div className={`standup-page ${!joined ? "blurred" : ""}`}>
                 <Sidebar teams={standup.teams} current={{team: standup.currentTeam, speaker: standup.currentSpeaker}} />
                 <div className="standup-page__main-view">
                     <LoadingBar
                         allocation={standup.teams.find(team => team.name === standup.currentTeam).allocationInSeconds}
                         timeLeft={standup.time}
                         backgroundImage={"linear-gradient(to right, rgba(79, 156, 248, 1), rgba(109, 222, 251, 1))"}
                     />
                     <Typography variant="h3" className="title">{standup.displayName}</Typography>
                     <StandupCurrentSpeaker
                        speaker={standup.currentSpeaker}
                        team={standup.currentTeam}
                        time={standup.time}
                        number={standup.teams.find(t => t.name === standup.currentTeam).randomNumber}
                     />
                 </div>
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

const mapStateToProps = (state) => (
    {
      standup: state.standup
    }
);

const mapDispatchToProps = dispatch => (
  {
    joinStandup: (name) => dispatch(actions.joinStandup(name)),
    leaveStandup: (name) => dispatch(actions.leaveStandup(name))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(StandupPage);