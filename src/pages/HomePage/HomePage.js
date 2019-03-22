import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import GridList from "@material-ui/core/es/GridList/GridList";
import GridListTile from "@material-ui/core/es/GridListTile/GridListTile";
import Typography from "@material-ui/core/es/Typography/Typography";

import { actions } from '../../ducks/standup/standup';

const HomePage = props => {

    useEffect(() => {
        props.getAllStandups()
    }, props.availableStandups);

    const {standups} = props;

    if (_.isEmpty(standups)) return <div>hiads</div>;

    return (
        <div style={{display: 'flex', justifyContent: 'space-evenly', height: '100vh', alignItems: 'center'}}>
            <GridList cellHeight={160} cols={2}>
            {
                standups.map(standup => (
                    <GridListTile key={standup.name} cols={1}>
                        {
                            props.location.pathname.includes('admin') ?

                                <Link to={`/admin/${standup.name}`}>
                                    <Typography align="center" variant="h5">{standup.displayName} admin page</Typography>
                                </Link>

                                :

                                <Link to={`/standups/${standup.name}`}>
                                    <Typography align="center" variant="h5">{standup.displayName}</Typography>
                                </Link>
                        }

                    </GridListTile>
                ))
            }
            </GridList>

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