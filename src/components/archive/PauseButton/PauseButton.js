import React from 'react';

import "./PauseButton.scss";
import RoundButton from '../RoundButton/RoundButton';

const PauseButton = (props) => {
    const activeClass = props.active ? " active" : " "
    return (
        <RoundButton onClick={props.onClick} className={`${props.className} ${activeClass}`}>
            <img src="" height="100" alt="Pause icon" />
        </RoundButton>
    )
}

export default PauseButton;