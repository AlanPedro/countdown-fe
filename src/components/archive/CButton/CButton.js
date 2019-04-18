import React from 'react';

import './CButton.scss';

const CButton = props => (
    <button 
        className="c-button primary"
        onClick={props.onClick}
        >
        {props.value}
    </button>
)

export default CButton;