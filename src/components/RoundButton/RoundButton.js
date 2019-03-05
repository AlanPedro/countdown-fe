import React from 'react';
import PropTypes from 'prop-types';

import "./RoundButton.scss";

const RoundButton = (props) => {
    const classes = `circle large-btn ${props.className}`;
    return (
        <button onClick={props.onClick} className={classes}>
            {props.children}
        </button>
    )
};

RoundButton.propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.node,
        PropTypes.string
    ]),
    onClick: PropTypes.func
}

RoundButton.defaultProps = {
    className: " ",
    children: "Click me!"
}

export default RoundButton;