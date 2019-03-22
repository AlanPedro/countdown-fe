import React, { Component } from 'react';
import {connect} from 'react-redux';
import posed, { PoseGroup } from 'react-pose';
import { Alert } from 'react-bootstrap';
import _ from 'lodash';

import './AdminPage.scss';
import { actions } from '../../ducks/standup/standup';
import RoundButton from '../../components/RoundButton/RoundButton';
import BackButton from '../../components/BackButton/BackButton';
import Popup from '../../components/Popup/Popup';
import CTextInput from '../../components/CTextInput/CTextInput';
import CButton from '../../components/CButton/CButton';
import AdminListItem from '../../components/AdminListItem/AdminListItem';
import playIcon from '../../assets/play-48.png';
import nextIcon from '../../assets/arrow-57-48.png';

class AdminPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            paused: true,
            started: false,
            isAuthenticated: true,
            password: "",
            showError: false
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

    onInputChange = e => this.setState({ password: e.target.value })
    signIn = () => {
        if (this.state.password === "iamadmin") {
            this.setState({ isAuthenticated: true });
        } else {
            this.setState({ showError: true });
        }
    }
    

    render() {
        const { standup } = this.props;
        console.log(this.state);
        if (_.isEmpty(standup)) return <h1>Loading...</h1>
        const { teams, currentTeam, currentSpeaker } = standup;
        const teamsToCome = teams.slice(teams.findIndex(team => currentTeam === team.name) + 1);
        return (
            <React.Fragment>

                <Popup show={!this.state.isAuthenticated}>
                    <h1 style={{ marginTop: '0'}}>
                        You need to sign in to access the admin panel
                    </h1>
                    { this.state.showError &&
                    <Alert variant='danger'>
                        Wrong password, try again
                    </Alert>
                    }
                    <CTextInput onChange={this.onInputChange} value={this.state.password} />
                    <CButton onClick={this.signIn} value="Sign In" />
                </Popup>
                <div className={`admin-page ${!this.state.isAuthenticated ? "blurred" : ""}`}>
                    
                    <BackButton className="abs back-btn" to="/" />
                    <span className="admin-page__name">{standup.displayName}</span>
                    <h2 className="admin-page__timer">{standup.time}</h2>
                    <h2 className="admin-page__current">{currentTeam} - {currentSpeaker}</h2>

                    <div className="admin-page__next-teams">
                        <PoseGroup>
                            {
                                teamsToCome.map(team => (
                                    <PosedTeam key={team.name} className="next-teams__team">
                                        <AdminListItem />
                                    </PosedTeam>
                                ))
                            }
                        </PoseGroup>
                    </div>
                    <div className="admin-page__buttons">
                        {/* {this.renderButtons()} */}
                        <img src={nextIcon} alt="Back" />
                        <img src={playIcon} alt="Play" />
                        <img src={nextIcon} alt="Next" />
                    </div>
                </div>
            </React.Fragment>
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