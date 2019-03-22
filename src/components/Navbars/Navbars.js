import React, {useEffect, useState} from 'react';
import Typography from "@material-ui/core/es/Typography";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";
import BottomNavigation from "@material-ui/core/es/BottomNavigation/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/es/BottomNavigationAction/BottomNavigationAction";
import ArrowBack from '@material-ui/icons/ArrowBack';
import MeetingRoomRounded from '@material-ui/icons/MeetingRoomRounded';
import PermIdentityRounded from '@material-ui/icons/PermIdentityRounded';
import HomeRounded from '@material-ui/icons/HomeRounded';
import {withRouter, Link} from "react-router-dom";
import {connect} from "react-redux";

import './Navbars.scss';
const Navbars = props => {

    useEffect(() => {
        if (props.location.pathname.includes('admin')) setValue(2);
        else if (props.location.pathname.includes('standups')) setValue(0);
        else if (props.location.pathname === '/') setValue(1)

    }, []);

    const [value, setValue] = useState(0);

    // TODO: Clean this up and find better way to get title
    const getTitleFromUrl = url => {
        try {
            if (url === "/standups") {
                return "Standups Homepage"
            } else if (url.includes("/standups/")) {
                const regex = url.includes("admin") ? /(?<=standups\/)[\w]*(?=\/admin)/ : /(?<=standups\/)[\w]*/;
                const name = url.match(regex)[0];
                return props.standups.find(s => name === s.name).displayName;
            } else if (url === "/admin") {
                return "Admin Homepage"
            } else {
                return "Countdown";
            }
        } catch (err) {
            return "Countdown"
        }
    };

    const handleChange = (e, v) => {
        if (v === 0)
            props.history.push('/standups');
        else if (v === 1)
            props.history.push('/');
        else if (v === 2)
            props.history.push('/admin');
        setValue(v);
    };

    const renderBackButton = url =>
        url !== "/" ?
            <Link to="/" style={{ color: 'white'}}>
                <ArrowBack role="button" />
            </Link>
            :
            null;

    return (
        <React.Fragment>
            <AppBar>
                <Toolbar>
                    {renderBackButton(props.location.pathname)}

                    <Typography style={{flexGrow: "5", color: "white", textAlign: "center" }} variant="h6">
                        {getTitleFromUrl(props.location.pathname)}
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className="app-screen">

                {props.children}

            </div>
            <BottomNavigation
                value={value}
                onChange={handleChange}
                showLabels
                className="bottom-nav"
            >
                <BottomNavigationAction label="Standups" icon={<MeetingRoomRounded />} />
                <BottomNavigationAction label="Home" icon={<HomeRounded />} />
                <BottomNavigationAction label="Admin" icon={<PermIdentityRounded />} />
            </BottomNavigation>
        </React.Fragment>
    )
};

const mapStateToProps = state => (
    {
        standups: state.availableStandups
    }
);

export default withRouter(connect(mapStateToProps, null)(Navbars));