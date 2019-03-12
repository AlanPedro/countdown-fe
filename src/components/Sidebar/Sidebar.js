import React from 'react';

import CText from '../CText/CText';
import { getDayAsString, getPrettyDate } from '../../utils';
import jez from '../../assets/badboii.png';

const Sidebar = (props) => {
    const { teams, current } = props;
    const today = new Date();

    const renderTeam = team => {
        const isTeamActive = current.team === team.name;
        const classes = isTeamActive ? "participant active" : "participant"
        return (
            <React.Fragment key={team.name}>
                <div className={classes}>
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
        )
    }

    return (
        <div className="standup-page__side-bar">
        <h3 className="date">
          {getDayAsString(today)}
          <br/>  
          <span className="light">
            {getPrettyDate(today)}
          </span>
        </h3>
        <div className="participants-wrapper">
          <hr className="participants__hr" />
          {
            teams.map(renderTeam)
          }
      </div>
    </div>
    )
}

export default Sidebar;