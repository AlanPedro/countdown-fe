import React from 'react';
import PropTypes from 'prop-types';

import './LoadingBar.scss';

const LoadingBar = ({percentage}) => (
    <div className="loading-bar">
        <div className="filler" style={{ width: `${100 - percentage}%` }} />
    </div>
);

LoadingBar.propTypes = {
    percentage: PropTypes.number.isRequired
}

LoadingBar.defaultProps = {
    percentage: 0
}

export default LoadingBar;