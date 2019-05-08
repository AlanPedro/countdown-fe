import React from 'react';

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

export default CTextInput;