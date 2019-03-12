import React, { Component } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import posed, { PoseGroup } from 'react-pose';

import './AdminPage.scss';
import { actions } from '../../ducks/standup/standup';
import RoundButton from '../../components/RoundButton/RoundButton';

class AdminPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            paused: true,
            started: false
        }
    }

    componentDidMount = () => this.props.initialiseStandup("auk");

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
        if (_.isEmpty(standup)) return <div>Hi</div>;
        const { teams, currentTeam, currentSpeaker } = standup;
        const teamsToCome = teams.slice(teams.findIndex(team => currentTeam === team.name) + 1);
        return (
            <div className="admin-page">
                <h1 className="admin-page__name">{standup.name}</h1>
                <h2 className="admin-page__timer">{60 - standup.time || 60}</h2>
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