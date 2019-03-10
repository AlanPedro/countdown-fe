import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import CText from '../../components/CText/CText';
import LoadingBar from '../../components/LoadingBar/LoadingBar';
import jez from '../../assets/badboii.png';
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
    this.props.getStandup("auk");
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount = () =>  window.removeEventListener('resize', this.updateWindowDimensions);
  
  updateWindowDimensions = () => this.setState({ window : { width: window.innerWidth, height: window.innerHeight }});
  
  render() {
    const { standup } = this.props;
    if (_.isEmpty(standup)) return <div> Hi </div>;
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
                  standup.team.map(team => (
                    <React.Fragment key={team.name}>
                      <div className="participant">
                        <img src={jez} alt="jez" className="participant__img" />
                        <div className="participant__text">
                          <CText weight="bold">{team.name}</CText>
                          <CText>{team.speaker}</CText>
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
              <LoadingBar percentage={standup.time} />
              <h1>{standup.name}</h1>
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
    getStandup: (id) => dispatch(actions.getStandup(id))
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(StandupPage);