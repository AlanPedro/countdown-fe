import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import CText from '../../components/CText/CText';
import Timer from '../../components/Timer/Timer';
import PlayPause from '../../components/PlayPause/PlayPause';
import TeamCover from '../../components/TeamCover/TeamCover';
import MainCarousel from '../../components/MainCarousel/MainCarousel';
import { GET_STANDUP, START_TIMER, STOP_TIMER, RESET_STANDUP, GO_TO_INDEX } from '../../actions';
import jez from '../../assets/badboii.png';
import "./StandupPage.scss";


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
        // if (_.isEmpty(standup)) 
        // return (
            // <>
            // <button style={{ border: "black solid 1px", fontSize: "100px", width: "50%" }} onClick={() => this.props.startStandup(0)}>Start BA standup</button>
            // <button style={{ border: "black solid 1px", fontSize: "100px", width: "50%" }} onClick={() => this.props.startStandup(1)}>Start Main Standup</button>
            // </>
        // )
        const { participants } = standup
        const isNext = currentIndex < participants.length - 1;
        const arrays = [1,2,3,4,5];
        return (
            <div className="standup-page">
                <div className="standup-page__side-bar">
                  <h3 className="date">
                    TUESDAY
                    <br/>  
                    <span className="light">
                     4TH OF FEBRUARY
                    </span>
                  </h3>
                  <div className="participants-wrapper">
                    <hr className="participants__hr" />
                    {
                        arrays.map(arr => (
                          <>
                            <div className="participant">
                              <img src={jez} alt="jez" className="participant__img" />
                              <div className="participant__text">
                                <CText weight="bold">EUA Team</CText>
                                <CText>Sam Dempsey</CText>
                              </div>
                              <div className="participant__circles">
                                  <span class="circle" />
                                  <span class="circle" />
                                  <span class="circle" />
                              </div>
                            </div>
                            <hr className="participants__hr" />
                          </>
                        ))
                    }
                </div>
                </div>
                <div className="standup-page__main-view">
                    

                    {/* <MainCarousel 
                    slideIndex={currentIndex}
                    window={window}
                >
                    {
                        _.map(participants, (team) => (
                        <TeamCover team={team} key={team.name} />
                        ))
                    }
                </MainCarousel> */}
            </div>
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