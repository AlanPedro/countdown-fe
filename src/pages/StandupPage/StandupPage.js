import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Sidebar from '../../components/Sidebar/Sidebar';
import LoadingBar from '../../components/LoadingBar/LoadingBar';
import "./StandupPage.scss";
import { actions } from "../../ducks/standup/standup";

class StandupPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      window: {
        height: 0,
        width: 0
      }
    }
  }
  
  componentDidMount = () => {
    this.updateWindowDimensions();
    this.props.joinStandup("auk");
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount = () =>  window.removeEventListener('resize', this.updateWindowDimensions);
  
  updateWindowDimensions = () => this.setState({ window : { width: window.innerWidth, height: window.innerHeight }});
  
  render() {
    const { standup } = this.props;
    if (_.isEmpty(standup)) return <div> Hi </div>;
    return (
        <div className="standup-page">
          <Sidebar teams={standup.teams} current={{team: standup.currentTeam, speaker: standup.currentSpeaker}} />
          <div className="standup-page__main-view">
              <LoadingBar percentage={standup.time} />
              <h1 className="title">{standup.name}</h1>
              <div className="speaker">
                <h1>{standup.currentTeam}</h1>
                <h2>{standup.currentSpeaker}</h2>
              </div>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => (
    {
      standup: state.standup
    }
)

const mapDispatchToProps = dispatch => (
  {
    joinStandup: (name) => dispatch(actions.joinStandup(name))
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(StandupPage);