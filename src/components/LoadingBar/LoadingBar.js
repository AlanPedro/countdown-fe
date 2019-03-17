import React from 'react';
import PropTypes from 'prop-types';
import posed from 'react-pose';

import './LoadingBar.scss';

const PosedLoadingBar = posed.div({
    passTime: {
        width: ({timePassed}) => `${timePassed}%`,
        transition: { ease: 'linear', duration: 1000 },
      }
})

const LoadingBar = ({allocation, timeLeft}) => (
    <div className="loading-bar">
        <PosedLoadingBar 
            className="filler" 
            timePassed={timeLeft / allocation * 100}
            pose={"passTime"}
            poseKey={timeLeft}
            />
    </div>
);

LoadingBar.propTypes = {
    percentage: PropTypes.number.isRequired
}

LoadingBar.defaultProps = {
    percentage: 0
}

export default LoadingBar;