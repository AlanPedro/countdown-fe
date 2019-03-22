import React from 'react';

import './AdminListItem.scss';

const AdminListItem = props => {
    const classes = `admin-list-item ${props.active ? "active" : ""}`
    return (
        <div className={classes}>
            <span className="position">1</span>
            <span className="name">Jeremy Kay</span>
            {/* <span className="team">Small Projects</span> */}
            <span className="time">60</span>
        </div>
    )
}

export default AdminListItem;