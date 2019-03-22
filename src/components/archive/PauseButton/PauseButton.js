import React from 'react';
import PropTypes from 'prop-types';

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

PauseButton.propTypes = {
    className: PropTypes.string,
    paused: PropTypes.bool
}

export default PauseButton;