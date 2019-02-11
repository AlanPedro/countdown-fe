import React from 'react';
import PropTypes from 'prop-types';
import { fmtMSS } from '../../utils'

const Timer = ({time}) => (
    <div className="timer justify-center">
        <h1>{fmtMSS(time)}</h1>
    </div>
)

Timer.propTypes = {
    time: PropTypes.number.isRequired
}

export default Timer;