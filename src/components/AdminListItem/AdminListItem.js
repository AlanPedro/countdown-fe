import React from 'react';

import './AdminListItem.scss';

const AdminListItem = props => {
    const classes = `admin-list-item ${props.active ? "active" : ""}`;
    return (
        <div className={classes}>
            <span className="position">{props.id}</span>
            <span className="name">{props.name}</span>
            {/* <span className="team">Small Projects</span> */}
            <span className="time">{props.time}</span>
        </div>
    )
};

export default AdminListItem;