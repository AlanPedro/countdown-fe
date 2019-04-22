import React from 'react';
import PropTypes from 'prop-types';

interface IProps {
    time: number;
    className?: String;
}

const Timer: React.FunctionComponent<IProps> = ({time, className}) => (
    <div className={`timer ${className || " "}`}>
        <h1>{time}</h1>
    </div>
);

export default Timer;