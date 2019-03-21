import React from 'react';

import CText from '../CText/CText';
import { getDayAsString, getPrettyDate } from '../../utils';
import placeholder from '../../assets/placeholder.png';
import posed from 'react-pose';
// import posed, { PoseGroup } from 'react-pose';

const PosedParticipantsWrapper = posed.div({
  rest: {
    y: ({ offset }) => -offset,
    transition: { duration: 1000}
  }
})

const Sidebar = (props) => {
    const { teams, current } = props;
    const today = new Date();

    const renderTeam = team => {
        const isTeamActive = current.team === team.name;
        const classes = isTeamActive ? "participant active" : "participant"
        return (
            <React.Fragment key={team.name}>
                <div className={classes}>
                  <img src={placeholder} alt="placeholder" className="participant__img" />
                  <div className="participant__text">
                    <CText weight="bold" letterSpacing="3">{team.name}</CText>
                    <CText letterSpacing="3">{team.speaker}</CText>
                  </div>
                  <div className="participant__circles">
                      <span className="circle" />
                      <span className="circle" />
                      <span className="circle" />
                  </div>
                </div>
                <hr className="participants__hr" />
            </React.Fragment>
        )
    }
    const currentTeamIndex = teams.findIndex(t => t.name === current.team);
    return (
        <div className="standup-page__side-bar">
        <h3 className="date">
          {getDayAsString(today)}
          <br/>  
          <span className="light">
            {getPrettyDate(today)}
          </span>
        </h3>
        <div className="participants-wrapper-wrapper">
          <div className="participants-wrapper">
            <hr className="participants__hr" />
            <div className="participant abs active highlighter" />
            <PosedParticipantsWrapper
              pose="rest"
              offset={currentTeamIndex * 73}
              poseKey={currentTeamIndex} 
            >
              {
                teams.map(renderTeam)
              }
            </PosedParticipantsWrapper>
          </div>
        </div>
    </div>
    )
}

export default Sidebar;