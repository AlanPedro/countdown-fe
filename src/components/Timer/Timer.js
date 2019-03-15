import React from 'react';
import PropTypes from 'prop-types';

const Timer = ({time}) => (
    <div className="timer justify-center">
        <h1>{time}</h1>
    </div>
)

Timer.propTypes = {
    time: PropTypes.number.isRequired
}

export default Timer;