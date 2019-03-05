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

const LoadingBar = ({percentage}) => (
    <div className="loading-bar">
        <PosedLoadingBar 
            className="filler" 
            timePassed={100 - percentage}
            pose={"passTime"}
            poseKey={percentage}
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