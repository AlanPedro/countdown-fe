import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';
import Typography from "@material-ui/core/es/Typography/Typography";

import Button from "@material-ui/core/es/Button/Button";
import Divider from "@material-ui/core/es/Divider/Divider";
import {actions, AllStandupsState} from "../../ducks/allStandups";
import SimpleSpinner from "../../components/SimpleSpinner/SimpleSpinner";
import { ApplicationState } from '../../ducks';
import { StandupNames } from '../../../@types/countdown';

export enum PageNames {
    ADMIN = "admin",
    CLIENT = "client",
    ADMIN_PANEL = "adminPanel"
}
interface RouterProps {
    name: string;
}

interface IProps extends RouteComponentProps<RouterProps> {
    pageName: PageNames
}
interface PropsFromDispatch {
    getAllStandups: () => void;
}
interface PropsFromState {
    standups: AllStandupsState
}

const HomePage: React.FunctionComponent<IProps & PropsFromDispatch & PropsFromState> = props => {

    useEffect(() => {
        props.getAllStandups()
    }, []);

    const {standups, pageName} = props;
    const getPage = (standup: StandupNames) => {
        if (pageName === "admin") return renderLink(`/admin/${standup.name}`, standup.displayName, "admin panel");
        else if (pageName === "client") return renderLink(`/standups/${standup.name}`, standup.displayName, "standup page")
        else if (pageName === "adminPanel") {
            return (
                <React.Fragment>
                     {renderLink(`/admin/${standup.name}/start`, standup.displayName, "run standup")}
                     {renderLink(`/admin/${standup.name}/edit`, standup.displayName, "edit standup")}
                 </React.Fragment>
            )
        }
    };

    const renderLink = (link: string, displayName: string, text: string) => (
        <Link to={link}>
            <Button variant="outlined" color="primary">
                <Typography align="center" variant="h5">{displayName} {text}</Typography>
            </Button>
        </Link>
    );

    if (standups.length < 1) return <SimpleSpinner />;

    if ( pageName === PageNames.ADMIN || pageName === PageNames.CLIENT) {
        return (
            <div style={{display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center', flexDirection: 'column'}}>
                {
                    standups.map((standup, index) => (
                        <React.Fragment key={index}>
                            <Divider style={{ margin: "10px 0"}}/>
                            {getPage(standup)}
                        </React.Fragment>
                    ))
                }
                { pageName === PageNames.ADMIN ?
                    <React.Fragment>
                        <Divider style={{ margin: "10px 0"}}/>
                        <Link to={`/admin/create`}>
                            <Button variant="outlined" color="primary">
                                <Typography align="center" variant="h5">Create standup</Typography>
                            </Button>
                        </Link>
                    </React.Fragment>
                    : null
                }
            </div>
        )
    }

    const standupName = props.match.params.name;
    const standup = standups.find(s => s.name === standupName)!;
    return (
        <div style={{display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center', flexDirection: 'column'}}>
                <React.Fragment>
                    {renderLink(`/admin/${standup.name}/start`, standup.displayName, "run standup")}
                    <Divider style={{ margin: "20px 0"}}/>
                    {renderLink(`/admin/${standup.name}/edit`, standup.displayName, "edit standup")}
                </React.Fragment>

        </div>
    );
};

const mapStateToProps = (state: ApplicationState) => (
    {
        standups: state.allStandups
    }
);

const mapDispatchToProps = (dispatch: Dispatch) => (
    {
        getAllStandups: () => dispatch(actions.getAllStandups())
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);