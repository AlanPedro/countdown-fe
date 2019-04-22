import React from 'react';

import './Popup.scss';

interface IProps {
    show: boolean;
    children?: React.ReactNode;
}

const Popup: React.FunctionComponent<IProps> = props => (
    <React.Fragment>
        <div className="popup-bg" style={{ display: props.show ? "block": "none"}} />
        <div className="popup-container" style={{ display: props.show ? "flex": "none"}}>
            <div className="popup">
                {props.children}
            </div>
        </div>
    </React.Fragment>
);

export default Popup;