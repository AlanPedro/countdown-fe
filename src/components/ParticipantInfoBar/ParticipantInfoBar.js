import React from 'react';
import CText from "../archive/CText/CText";
import RandomAvatar from "../RandomAvatar/RandomAvatar";
import DraggableCircles from "../DraggableCircles/DraggableCircles";

const ParticipantInfoBar = props => {

    const { team, active } = props;
    const classes = active ? "participant active" : "participant";

    return (
        <React.Fragment key={team.name}>
            <div className={classes}>
                <RandomAvatar height="70px" width="70px" number={team.randomNumber} />
                <div className="participant__text">
                    <CText weight="bold" letterSpacing="3">{team.name}</CText>
                    <CText letterSpacing="3">{team.speaker}</CText>
                </div>
                <DraggableCircles size={3} className="participants-circles"/>
            </div>
            <hr className="participants__hr" />
        </React.Fragment>
    )
};

export default ParticipantInfoBar;