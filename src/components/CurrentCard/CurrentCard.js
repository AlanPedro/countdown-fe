import React from 'react';
import Avatar from "@material-ui/core/es/Avatar";
import Typography from "@material-ui/core/es/Typography";

const CurrentCard = props => {
    const { title, subtitle, sideIcon } = props;
    return (
        <div className="admin-page__current">
            <Avatar className="large-avatar">{title[0]}</Avatar>
            <div className={"current-speaker"}>
                <Typography component="h5" variant="h5">
                    {title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    {subtitle}
                </Typography>
            </div>
            <Typography className="current-time" variant="h5">{sideIcon}</Typography>
        </div>
    )
};

export default CurrentCard;