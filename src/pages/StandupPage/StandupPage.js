import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import Typography from "@material-ui/core/es/Typography/Typography";
import Button from "@material-ui/core/es/Button/Button";

import "./StandupPage.scss";
import { actions } from "../../ducks/standup/standup";
import Sidebar from '../../components/Sidebar/Sidebar';
import LoadingBar from '../../components/LoadingBar/LoadingBar';
import Timer from '../../components/Timer/Timer';
import Popup from "../../components/Popup/Popup";
import RandomAvatar from "../../components/RandomAvatar/RandomAvatar";


const StandupPage = props => {

    useEffect(() => {
        //DidMount & DidUpdate
        props.joinStandup(props.match.params.name);

        // WillUnmount
        return () => {
            props.leaveStandup(props.match.params.name);
        }
    }, []);

    const [joined, setJoined] = useState(false);

    const renderTimer = time => time <= 10 ? <Timer time={time} /> : null;
    const { standup } = props;

    if (!standup.teams) return <h1 style={{ textAlign: "center" }}> Loading... </h1>;

    return (
        <React.Fragment>
            <div className={`standup-page ${!joined ? "blurred" : ""}`}>
                 <Sidebar teams={standup.teams} current={{team: standup.currentTeam, speaker: standup.currentSpeaker}} />
                 <div className="standup-page__main-view">
                     <LoadingBar
                         className="main-view__loading-bar"
                         allocation={standup.teams.find(team => team.name === standup.currentTeam).allocationInSeconds}
                         timeLeft={standup.time}
                     />
                     <Typography variant="h3" className="title">{standup.displayName}</Typography>
                     <div className="speaker">
                        <Typography variant="h3">{standup.currentSpeaker}</Typography>
                        <Typography variant="h4" color="textSecondary">{standup.currentTeam}</Typography>
                         <RandomAvatar height="70%" style={{alignSelf: "center", justifySelf: "center"}} number={standup.teams.find(t => t.name === standup.currentTeam).randomNumber} />
                         <div className="standup-timer">
                            {renderTimer(standup.time)}
                         </div>
                     </div>
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