import React from 'react';
import PropTypes from 'prop-types';

import './CText.scss';

const CText = ({children, weight, letterSpacing}) => {
    const w = weight !== undefined ? weight : " ";
    const classes = `countdown-text ` + w;
    return (
        <span
            className={classes}
            style={{ letterSpacing: `${letterSpacing}px`}}
            >
            {children}
        </span>
    )
};

// Update to validate types of weight: Bold, Light, Normal, Semibold
CText.propTypes = {
    children: PropTypes.string,
    weight: PropTypes.string
}

export default CText;