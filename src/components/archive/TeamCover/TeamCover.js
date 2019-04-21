import React from 'react';
import posed from 'react-pose';

import './TeamCover.css';
import jez from '../../assets/badboii.png'
import { ICON_OFFSET_X } from '../../config/constants';

const styles = {
    width: `${ICON_OFFSET_X}vw`
}

const PosedTeamCover = posed.div({
    rest: {
      x: ({offset}) => -offset,
      opacity: ({position}) => Math.cos(position / 2.5),  
      transition: { ease: 'backInOut', duration: 1000 },
      scale: ({position}) => Math.cos(position / 2.5)
    }
  })

const TeamCover = ({team, position, offset}) => (
    <PosedTeamCover 
    className="team-cover" 
    style={{ ...styles, left: `${team.id * ICON_OFFSET_X}%` }}
    offset={offset}
    poseKey={position}
    pose={"rest"}
    position={position}
    >
        <h1>{team.name}</h1>
        <div className="circle">
            <img src={jez} alt={`${team.name} team lead`} />
        </div>
    </PosedTeamCover>
)

export default TeamCover;