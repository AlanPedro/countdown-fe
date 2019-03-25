import React from 'react';
import posed from 'react-pose';

import ParticipantInfoBar from "../ParticipantInfoBar/ParticipantInfoBar";
import SidebarDate from "../SidebarDate/SidebarDate";

const PosedParticipantsWrapper = posed.div({
  rest: {
    y: ({ offset }) => -offset,
    transition: { duration: 1000}
  }
});

const Sidebar = (props) => {
    const { teams, current } = props;
    const today = new Date();
    const currentTeamIndex = teams.findIndex(t => t.name === current.team);
    return (
        <div className="standup-page__side-bar">
        <SidebarDate date={today} />
        <div className="participants-wrapper-wrapper">
          <div className="participants-wrapper">
            <hr className="participants__hr" />
            <div className="participant abs active highlighter" />
            <PosedParticipantsWrapper
              pose="rest"
              offset={currentTeamIndex * 72}
              poseKey={currentTeamIndex} 
            >
              {
                teams.map(t =>
                    <ParticipantInfoBar
                        key={`${t.name}-${t.speaker}`}
                        team={t}
                        active={current.team === t.name && current.speaker === t.speaker}
                    />
                )
              }
            </PosedParticipantsWrapper>
          </div>
        </div>
    </div>
    )
};

export default Sidebar;