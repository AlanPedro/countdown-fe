import React from 'react';
import { connect } from 'react-redux';

import CText from '../../components/CText/CText';
import LoadingBar from '../../components/LoadingBar/LoadingBar';
import PlayPauseButtons from '../../components/PlayPauseButtons/PlayPauseButtons';
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
    
      pressPause = () => {
        this.setState(state => ({ paused: true }))
        this.props.stopTimer()
      };

      pressPlay = () => {
        this.setState(state => ({ paused: false }))
        this.props.startTimer()
      };

    render(){
        const { paused } = this.state;
        const { standup, time, currentIndex } = this.props;
        const { participants } = standup
        const isNext = currentIndex < participants.length - 1;
        console.log(isNext)
      
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
                          <React.Fragment key={arr}>
                            <div key={arr} className="participant">
                              <img src={jez} alt="jez" className="participant__img" />
                              <div className="participant__text">
                                <CText weight="bold">EUA Team</CText>
                                <CText>Sam Dempsey</CText>
                              </div>
                              <div className="participant__circles">
                                  <span className="circle" />
                                  <span className="circle" />
                                  <span className="circle" />
                              </div>
                            </div>
                            <hr className="participants__hr" />
                          </React.Fragment>
                        ))
                    }
                </div>
              </div>
              <div className="standup-page__main-view">
                  <LoadingBar percentage={time} />
                  <PlayPauseButtons
                     className="abs-br" 
                     paused={paused}
                     onPressPlay={this.pressPlay}
                     onPressPause={this.pressPause}
                     />
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