import React from 'react';
import { storiesOf } from '@storybook/react';
import CssBaseline from '@material-ui/core/CssBaseline';

import Popup from '../src/components/Popup/Popup';
import CButton from '../src/components/archive/CButton/CButton';
import AdminListItem from '../src/components/AdminListItem/AdminListItem';
import '../src/App.scss';
import RoundButton from '../src/components/RoundButton/RoundButton';
import AdminPage from "../src/pages/AdminPage/AdminPage";


storiesOf('Popup', module)
    // .addDecorator(CssBaseline)
    .add('normal', () => (
        <Popup><h1>adsads</h1></Popup>
    ))
    .add('authentication', () => (
        <Popup>
            <h1 style={{marginTop: "0"}}>
                Sign In to access Admin Panel
            </h1>
            <CTextInput onChange={() => {}} value="passwordtime" type="password" />
            <CButton value="Sign In" onClick={() => {}} />
        </Popup>
    ));

storiesOf('Button', module)
    // .addDecorator(CssBaseline)
    .add('normal', () => (
        <CButton value="Save and Continue" />
    ));

storiesOf('RoundButton', module)
    // .addDecorator(CssBaseline)
    .add('normal', () => (
        <RoundButton></RoundButton>
    ));

storiesOf('AdminListItem', module)
    // .addDecorator(CssBaseline)
    .add('normal', () => (
        <AdminListItem />
    ))
    .add('list', () => (
        <div style={{ 
            width: "400px",
             margin: '10px',
             padding: '150px',
              background: "#F9EEEF"}}>
            <AdminListItem active={true} />
            <AdminListItem />
            <AdminListItem />
            <AdminListItem />
            <AdminListItem />
        </div>
    ));

storiesOf('AdminPage', module)
    // .addDecorator(CssBaseline)
    .add('normal', () => <AdminPage name="main" />)