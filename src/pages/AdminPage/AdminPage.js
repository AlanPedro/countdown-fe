import React, { Component } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import { actions } from '../../ducks/standup/standup';

class AdminPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            paused: true
        }
    }

    componentDidMount = () => this.props.getStandup("auk");

    renderButtons = () => (
        this.state.paused ? 
            <button onClick={this.next}>NEXT</button>
            :
            <React.Fragment>
                <button onClick={this.pause}>PAUSE</button>
                <button onClick={this.next}>NEXT</button>
            </React.Fragment>
    )

    start = () => {
        this.setState({ paused: false })
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
        return (
            <div>

                <h1>{standup.name}</h1>
                {/* <h2>{standup.time || 60}</h2> */}
                {/* <h2>{standup.team} - {standup.currentSpeaker || "EA"}</h2> */}

                <button onClick={this.start}>START</button>
                {this.renderButtons()}
            </div>
        );
    }
}

const mapStateToProps = state => (
    {
      standup: state.standup
    }
)

const mapDispatchToProps = dispatch => (
  {
    getStandup: (id) => dispatch(actions.getStandup(id)),
    startStandup: () => dispatch(actions.startStandup()),
    pauseStandup: () => dispatch(actions.pauseStandup()),
    nextSpeaker: () => dispatch(actions.toNextSpeaker())
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);