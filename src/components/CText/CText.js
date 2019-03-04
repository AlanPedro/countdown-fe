import React from 'react';
import PropTypes from 'prop-types';

const CText = ({children, weight}) => {
    const w = weight !== undefined ? weight : " ";
    const classes = `countdown-text ` + w;
    console.log(classes)
    return (
        <span className={classes}>
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