import React from 'react';
import PropTypes from 'prop-types';

import './CTextInput.scss';

const CTextInput = props => (
    <input 
        type={props.type || "text"}
        className="c-text-input" 
        placeholder={props.placeholder || ""} 
        onChange={props.onChange}
        value={props.value}
        />
);

CTextInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string
}

export default CTextInput;