import React from 'react';
import PropTypes from 'prop-types';
import posed from 'react-pose';

import './LoadingBar.scss';

const PosedLoadingBar = posed.div({
    passTime: {
        width: ({timePassed}) => `${timePassed}%`,
        transition: { ease: 'linear', duration: 1000 },
      }
});

const LoadingBar = ({allocation, timeLeft, className}) => (
    <div className="loading-bar">
        <PosedLoadingBar
            className={`filler ${className}`}
            timePassed={timeLeft / allocation * 100}
            pose={"passTime"}
            poseKey={timeLeft}
            />
    </div>
);

LoadingBar.propTypes = {
    allocation: PropTypes.number.isRequired,
    timeLeft: PropTypes.number.isRequired,
    className: PropTypes.string
};

LoadingBar.defaultProps = {
    allocation: 60,
    timeLeft: 60
};

export default LoadingBar;