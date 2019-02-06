import React, { Component } from 'react';
import _ from 'lodash';
//import openSocket from 'socket.io-client';
import './App.css'
import MainCarousel from './components/MainCarousel/MainCarousel';
import TeamCover from './components/TeamCover/TeamCover';
import {dummyApi} from './api/dummy'
import { fmtMSS } from './utils';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      teams: [],
      //socket: openSocket('ws://demos.kaazing.com/echo'),
      time: 60,
      currentIndex: 0,
      window: {
        height: 0,
        width: 0
      },
      paused: false
    }
  }

  back = () => this.setState(state => (state.currentIndex > 0 ? { currentIndex: state.currentIndex - 1 } : { currentIndex: state.currentIndex }))
  next = () => this.setState(state => (state.currentIndex < state.teams.length - 1 ? { currentIndex: state.currentIndex + 1 } : { currentIndex: state.currentIndex }))
  reset = () => this.setState(state => ({currentIndex: 0 }))

  componentDidMount = () => {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.setState({
      teams: dummyApi,
      window : { width: window.innerWidth, height: window.innerHeight }
    })
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions = () => {
    this.setState({ window : { width: window.innerWidth, height: window.innerHeight }});
  }

  handlePlayPauseClick = () => this.setState((state) => ({ paused: !state.paused}))

  render() {
    const {teams, currentIndex, window, paused, time } = this.state;
    const activeTeam = teams.find(team => team.id === currentIndex)
    if (!activeTeam) return <div>LOADING</div>;
    return (
      <div className="App">
            <MainCarousel 
            slideIndex={currentIndex}
            window={window}
          >
              {
                _.map(teams, (team) => (
                  <TeamCover team={team} key={team.name} />
                ))
              }
          </MainCarousel>
        <div className="timer justify-center">
            <h1>{fmtMSS(time)}</h1>
        </div>
        <div className="justify-center buttons">
          <button className={`pause-btn ${paused ? "paused" : ""}`} onClick={this.handlePlayPauseClick} />
        </div>
        <button style={{position: 'absolute', top: '20%'}} onClick={this.next}>NEXT</button>
        <button style={{position: 'absolute', top: '25%'}} onClick={this.back}>BACK</button>
        <button style={{position: 'absolute', top: '30%'}} onClick={this.reset}>RESET</button>
      </div>
    );
  }
}
// TODO: Add svg circle timer
// const PosedSvg = posed.svg({})

export default App;