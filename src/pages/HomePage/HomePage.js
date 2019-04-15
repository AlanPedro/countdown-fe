import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import Typography from "@material-ui/core/es/Typography/Typography";

import { actions } from '../../ducks/standup/standup';
import Button from "@material-ui/core/es/Button/Button";
import Divider from "@material-ui/core/es/Divider/Divider";

const HomePage = props => {

    useEffect(() => {
        props.getAllStandups()
    }, props.availableStandups);

    const {standups, pageName} = props;
    const getPage = standup => {
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

    const renderLink = (link, displayName, text) => (
        <Link to={link}>
            <Button variant="outlined" color="primary">
                <Typography align="center" variant="h5">{displayName} {text}</Typography>
            </Button>
        </Link>
    );

    if (_.isEmpty(standups)) return <h1>Loading...</h1>;

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
            { pageName === "admin" ?
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
    );
};

const mapStateToProps = state => (
    {
        standups: state.availableStandups
    }
);

const mapDispatchToProps = dispatch => (
    {
        getAllStandups: () => dispatch(actions.getAllStandups())
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);