import React, { Component } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import { actions } from '../../ducks/standup/standup';
import RoundButton from '../../components/RoundButton/RoundButton';

class HomePage extends Component {

    componentDidMount() {
        this.props.getAllStandups();
    }

    render() {
        const { standups } = this.props;
        if (_.isEmpty(standups)) return <div>hiads</div>;
        return (
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                {
                    standups.map(standup => (
                        <div key={standup}>
                            <Link to={`/standups/${standup}`}>
                                <RoundButton>
                                    { standup }
                                </RoundButton>
                            </Link>
                            <Link to={`/standups/${standup}/admin`}>
                                <RoundButton>
                                    { standup } admin page
                                </RoundButton>
                            </Link>
                        </div>
                    ))
                }
            </div>
        );
    }
}

const mapStateToProps = state => (
    {
        standups: state.availableStandups
    }
)

const mapDispatchToProps = dispatch => (
    {
        getAllStandups: () => dispatch(actions.getAllStandups())
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);