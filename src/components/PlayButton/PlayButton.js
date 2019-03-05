import React from 'react';
import PropTypes from 'prop-types';

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

PlayButton.propTypes = {
    className: PropTypes.string,
    paused: PropTypes.bool
}

export default PlayButton;