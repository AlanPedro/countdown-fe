import React from 'react';

import './CText.scss';

const CText = ({children, weight, letterSpacing}) => {
    const classes = `countdown-text ` + weight;
    return (
        <span
            className={classes}
            style={{ letterSpacing: `${letterSpacing}px`}}
            >
            {children}
        </span>
    )
};

CText.defaultProps = {
    weight: " "
};

export default CText;