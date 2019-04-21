import React from 'react';
import PropTypes from 'prop-types';

import './PlayPauseButtons.scss';
import PlayButton from '../PlayButton/PlayButton';
import PauseButton from '../PauseButton/PauseButton';

const PlayPauseButtons = ({className, paused, onPressPlay, onPressPause}) => {

    const pressedPlay = () => {
        if (!paused) return;
        else onPressPlay()
    }

    const pressedPause = () => {
        if (paused) return;
        else onPressPause()
    }

    return (
        <div className={`play-pause-container ${className}`}>
            <PauseButton onClick={pressedPause} active={paused} />
            <PlayButton onClick={pressedPlay} active={!paused} />
        </div>
    )
}

PlayPauseButtons.propTypes = {
    paused: PropTypes.bool,
    className: PropTypes.string,
    onPressPause: PropTypes.func,
    onPressPlay: PropTypes.func
}

PlayPauseButtons.defaultProps = {
    paused: true,
    className: " "
}

export default PlayPauseButtons;