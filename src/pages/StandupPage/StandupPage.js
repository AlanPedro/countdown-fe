import React, {useEffect} from 'react';
import { connect } from 'react-redux';

import Sidebar from '../../components/Sidebar/Sidebar';
import LoadingBar from '../../components/LoadingBar/LoadingBar';
import Timer from '../../components/Timer/Timer';
import { actions } from "../../ducks/standup/standup";
import "./StandupPage.scss";
import Typography from "@material-ui/core/es/Typography/Typography";

const StandupPage = props => {

    useEffect(() => {
        //DidMount & DidUpdate
        props.joinStandup(props.match.params.name);

        // WillUnmount
        return () => {
            props.leaveStandup(props.match.params.name);
        }
    }, []);

    const renderTimer = time => time <= 10 ? <Timer time={time} /> : null;
    const { standup } = props;

    if (!standup.teams) return <div> Loading... </div>;

    return (
        <div className="standup-page">
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

                   {renderTimer(standup.time)}
                 </div>
             </div>
             {
                !standup.live &&
                <div className="standup-off-fg">
                    <div className="refresh-container">
                     <h1>Standup is not live!</h1>
                     <button value="Refresh Page" onClick={() => window.location.reload() }>Refresh page</button>
                    </div>
                </div>
             }
       </div>
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