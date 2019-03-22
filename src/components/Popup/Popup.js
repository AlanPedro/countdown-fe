import React from 'react';
import PropTypes from 'prop-types';

import './Popup.scss';

const Popup = props => (
    <React.Fragment>
        <div className="popup-bg" style={{ display: props.show ? "block": "none"}} />
        <div className="popup-container" style={{ display: props.show ? "flex": "none"}}>
            <div className="popup">
                {props.children}
            </div>
        </div>
    </React.Fragment>
);


Popup.propTypes = {
    children: PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.func,
          PropTypes.node
        ]).isRequired
      ).isRequired,
    show: PropTypes.bool.isRequired
};

export default Popup;