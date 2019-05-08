import React from 'react';

import "./PlayButton.scss";
import arrow from "../../assets/arrow.svg";
import RoundButton from '../RoundButton/RoundButton';

const PlayButton = (props) => {
    const activeClass = props.active ? " active" : " ";
    return (
        <RoundButton onClick={props.onClick} className={`${props.className} ${activeClass}`}>
            <img src={arrow} height="35" alt="Play Icon" />
        </RoundButton>
    )
}

export default PlayButton;