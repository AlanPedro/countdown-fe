import React, { Component } from 'react';
import {connect} from 'react-redux';
import posed, { PoseGroup } from 'react-pose';

import './AdminPage.scss';
import { actions } from '../../ducks/standup/standup';
import RoundButton from '../../components/RoundButton/RoundButton';
import BackButton from '../../components/BackButton/BackButton';
import Popup from '../../components/Popup/Popup';
import CTextInput from '../../components/CTextInput/CTextInput';

class AdminPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            paused: true,
            started: false,
            isAuthenticated: false
        }
    }

    componentDidMount = () => this.props.initialiseStandup(this.props.match.params.name);

    renderButtons = () => {
        const button = !this.state.started 
                        ?  <RoundButton onClick={this.start}>START</RoundButton>
                        :  this.state.paused ? <RoundButton disabled={true} onClick={this.pause}>PAUSE</RoundButton>
                                             : <RoundButton onClick={this.pause}>PAUSE</RoundButton>
        return (
            <React.Fragment>
                {button}
                <RoundButton onClick={this.next}>NEXT</RoundButton>
            </React.Fragment>
        )
    }

    start = () => {
        this.setState({ paused: false, started: true })
        this.props.startStandup();
    }
    
    pause = () => {
        this.setState({ paused: true })
        this.props.pauseStandup()
    }
    
    next = () => {
        this.setState({ paused: false })
        this.props.nextSpeaker();
    }

    render() {
        const { standup } = this.props;
        console.log(this.props);
        if (!this.state.isAuthenticated) 
            return (
                <Popup>
                    <h1>
                        You need to sign in to access the admin panel
                    </h1>
                    <CTextInput onChange={this.onInputChange} value={this.state.password} />
                    <button onClick={this.signIn}>Sign In</button>
                </Popup>
            );
        const { teams, currentTeam, currentSpeaker } = standup;
        const teamsToCome = teams.slice(teams.findIndex(team => currentTeam === team.name) + 1);
        return (
            <div className="admin-page">
                <BackButton className="abs back-btn" to="/" />
                <h1 className="admin-page__name">{standup.name}</h1>
                <h2 className="admin-page__timer">{standup.time}</h2>
                <h2 className="admin-page__current">{currentTeam} - {currentSpeaker}</h2>

                <div className="admin-page__next-teams">
                    <PoseGroup>
                        {
                            teamsToCome.map(team => (
                                <PosedTeam key={team.name} className="next-teams__team">
                                    <h3>{team.name}</h3>
                                </PosedTeam>
                            ))
                        }
                    </PoseGroup>
                    <hr />
                    <h3>Enter password to start</h3>
                    <input type="text" onChange={this.onInputChange} value={this.state.password} />
                </div>
                <div className="admin-page__buttons">
                    {this.renderButtons()}
                </div>
            </div>
        );
    }
}

const PosedTeam = posed.div({
    enter: { opacity : 1},
    exit: { opacity : 0},
});

const mapStateToProps = state => (
    {
      standup: state.standup
    }
)

const mapDispatchToProps = dispatch => (
  {
    initialiseStandup: name => dispatch(actions.loadStandup(name)),
    startStandup: () => dispatch(actions.startStandup()),
    pauseStandup: () => dispatch(actions.pauseStandup()),
    nextSpeaker: () => dispatch(actions.toNextSpeaker())
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);