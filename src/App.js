import React, { Component } from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
//import openSocket from 'socket.io-client';
import './App.css'
import MainCarousel from './components/MainCarousel/MainCarousel';
import TeamCover from './components/TeamCover/TeamCover';
import PlayPause from './components/PlayPause/PlayPause'
import Timer from './components/Timer/Timer'
import { INIT_STANDUP } from './actions';
import { STANDUP_TIME } from './config/constants';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: STANDUP_TIME,
      currentIndex: 0,
      window: {
        height: 0,
        width: 0
      },
      paused: true
      //socket: openSocket('ws://demos.kaazing.com/echo'),
    }
  }

  reset = () => this.setState(state => ({currentIndex: 0, time: STANDUP_TIME }))
  next = () => this.setState(state => ({ currentIndex: state.currentIndex + 1, time: STANDUP_TIME }))

  componentDidMount = () => {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateWindowDimensions);
    window.clearInterval(this.timerInterval)
  }
  
  updateWindowDimensions = () => {
    this.setState({ window : { width: window.innerWidth, height: window.innerHeight }});
  }

  completeTimer = () => {
    window.clearInterval(this.timerInterval)
    this.setState({time: 0, paused: true})
  }

  handleSecondTick = () => {
    // this.state.time is behind by 1 second due to the way setInterval works
    const time = this.state.time - 1;
    const isNext = this.state.currentIndex < this.props.standup.participants.length - 1;
    if (time === - 1 && isNext) {
        this.setState((state) => ({ time: STANDUP_TIME, currentIndex: this.state.currentIndex + 1 }))
    } else if (time === -1 && !isNext) { 
      this.completeTimer()
    } else {
      this.setState((state) => ({ time: state.time - 1 }))
    }
  }

  handlePlayPauseClick = () => {
    if (this.state.paused) {
      this.timerInterval = window.setInterval(this.handleSecondTick, 1000)
    } else {
      window.clearInterval(this.timerInterval)
    }
    this.setState((state) => ({ paused: !state.paused}))
  }

  render() {
    const { currentIndex, window, paused, time } = this.state;
    const { standup } = this.props;
    if (_.isEmpty(standup)) return <button style={{ border: "black solid 1px", fontSize: "100px", width: "50%" }} onClick={this.props.startStandup}>START</button>;
    const { participants } = standup
    const isNext = currentIndex < participants.length - 1
    return (
      <div className="App">
          <h1 className="title center">{standup.name}</h1>
            <MainCarousel 
            slideIndex={currentIndex}
            window={window}
          >
              {
                _.map(participants, (team) => (
                  <TeamCover team={team} key={team.name} />
                ))
              }
          </MainCarousel>
        <Timer time={time} />
        <PlayPause paused={paused} onClick={this.handlePlayPauseClick} />
        <button className="next-button" hidden={!isNext} onClick={this.next}>NEXT</button>
        <button style={{position: 'absolute', top: '30%',  border: '1px solid black '}} onClick={this.reset}>RESET</button>
      </div>
    );
  }
}
// TODO: Add svg circle timer
// const PosedSvg = posed.svg({})

const mapStateToProps = (state) => (
    {
      standup: state.standup
    }
)

const mapDispatchToProps = dispatch => (
  {
    startStandup: () => dispatch({ type: INIT_STANDUP})
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(App);