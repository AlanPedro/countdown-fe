import React from 'react';
import PropTypes from 'prop-types';

import "./RoundButton.scss";

const RoundButton = (props) => {
    const classes = `circle large-btn ${props.className}`;
    return (
        <button onClick={props.onClick} disabled={props.disabled} className={classes}>
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
    onClick: PropTypes.func,
    disabled: PropTypes.bool
}

RoundButton.defaultProps = {
    className: " ",
    children: "Click me!",
    disabled: false
}

export default RoundButton;