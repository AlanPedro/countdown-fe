import * as React from 'react';
import {withRouter, RouteComponentProps} from "react-router-dom";
import {connect} from "react-redux";
import * as H from "history";

import Typography from "@material-ui/core/es/Typography";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";
import BottomNavigation from "@material-ui/core/es/BottomNavigation/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/es/BottomNavigationAction/BottomNavigationAction";
import ArrowBack from '@material-ui/icons/ArrowBack';
import MeetingRoomRounded from '@material-ui/icons/MeetingRoomRounded';
import HomeRounded from '@material-ui/icons/HomeRounded';

import './Navbars.scss';
import {TeamNames} from "../../../@types/countdown";
import { ApplicationState } from '../../ducks';

interface RouterProps {
    name: string;
}

interface PropsFromStore {
    readonly teams: TeamNames[]
}

interface NavbarsProps extends RouteComponentProps<RouterProps> {
    location: H.Location;
    history: H.History;
    children?: React.ReactNode;
}

const Navbars: React.FunctionComponent<NavbarsProps & PropsFromStore> = ({location, history, teams, children}) => {

    React.useEffect(() => {
        // if (location.pathname.includes('admin')) setValue(2);
        if (location.pathname.includes('project')) setValue(1);
        else if (location.pathname === '/') setValue(0);
    }, [location.pathname]);

    const [value, setValue] = React.useState(0);

    // TODO: Clean this up and find better way to get title
    const getTitleFromUrl = (url: string) => {
        try {
            if (url === "/project") {
                return "Projects"
            } else if (url.includes("/project/")) {
                const regex = url.includes("admin") ? /(?<=standups\/)[\w]*(?=\/admin)/ : /(?<=standups\/)[\w]*/;
                const name = url.match(regex)![0];
                return teams.find(s => name === s.name)!.displayName;
            // } else if (url === "/admin") {
                // return "Admin Homepage"
            } else {
                return "Countdown";
            }
        } catch (err) {
            return "Countdown"
        }
    };

    const handleChange = (e: any, v: number) => {
        if (v === 0)
            history.push('/');
        else if (v === 1)
            history.push('/project');
        // else if (v === 2)
            // history.push('/admin');
        setValue(v);
    };

    const renderBackButton = (url: string) =>
        url !== "/" ?
            <div onClick={() => history.goBack()} style={{ color: 'white', cursor: 'pointer'}}>
                <ArrowBack role="button" />
            </div>
            :
            null;

    return (
        <React.Fragment>
            <AppBar>
                <Toolbar>
                    {renderBackButton(location.pathname)}

                    <Typography style={{flexGrow: 5, color: "white", textAlign: "center" }} variant="h6">
                        {getTitleFromUrl(location.pathname)}
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className="app-screen">

                {children}

            </div>
            <BottomNavigation
                value={value}
                onChange={handleChange}
                showLabels
                className="bottom-nav"
            >
                <BottomNavigationAction label="Home" icon={<HomeRounded />} />
                <BottomNavigationAction label="Projects" icon={<MeetingRoomRounded />} />
                {/* <BottomNavigationAction label="Admin" icon={<PermIdentityRounded />} /> */}
            </BottomNavigation>
        </React.Fragment>
    )
};

function mapStateToProps(state: ApplicationState): PropsFromStore {
    return {
        teams: state.teams
    }
}

export default withRouter<NavbarsProps>(connect(mapStateToProps)(Navbars));