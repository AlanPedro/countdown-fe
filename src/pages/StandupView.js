import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import Timer from '../components/Timer/Timer';
import PlayPause from '../components/PlayPause/PlayPause';
import TeamCover from '../components/TeamCover/TeamCover';
import MainCarousel from '../components/MainCarousel/MainCarousel';
import { GET_STANDUP, START_TIMER, STOP_TIMER, RESET_STANDUP, GO_TO_INDEX } from '../actions';

class StandupPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          window: {
            height: 0,
            width: 0
          },
          paused: true
        }
      }
    
      reset = () => this.props.resetStandup();
      next = () => this.props.goTo(this.props.currentIndex);
    
      componentDidMount = () => {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
      }
    
      componentWillUnmount = () => {
        window.removeEventListener('resize', this.updateWindowDimensions);
      }
      
      updateWindowDimensions = () => {
        this.setState({ window : { width: window.innerWidth, height: window.innerHeight }});
      }
    
      handlePlayPauseClick = () => {
        if (this.state.paused) {
          this.props.startTimer()
        } else {
          this.props.stopTimer()
        }
        this.setState((state) => ({ paused: !state.paused}))
      }

    render(){
        const { window, paused } = this.state;
        const { standup, time, currentIndex } = this.props;
        if (_.isEmpty(standup)) 
        return (
            <>
            <button style={{ border: "black solid 1px", fontSize: "100px", width: "50%" }} onClick={() => this.props.startStandup(0)}>Start BA standup</button>
            <button style={{ border: "black solid 1px", fontSize: "100px", width: "50%" }} onClick={() => this.props.startStandup(1)}>Start Main Standup</button>
            </>
        )
        const { participants } = standup
        const isNext = currentIndex < participants.length - 1
        return (
            <div className="standup-page">
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
        )
    }
}


const mapStateToProps = (state) => (
    {
      standup: state.standup,
      time: state.timer,
      currentIndex: state.current
    }
)

const mapDispatchToProps = dispatch => (
  {
    startStandup: (id) => dispatch({ type: GET_STANDUP, payload: id}),
    startTimer: () => dispatch({ type: START_TIMER }),
    stopTimer: () => dispatch({ type: STOP_TIMER }),
    resetStandup: () => dispatch({ type: RESET_STANDUP }),
    goTo: () => dispatch({ type: GO_TO_INDEX })
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(StandupPage);