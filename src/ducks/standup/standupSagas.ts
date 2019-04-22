import {call, cancel, cancelled, fork, put, take, takeLatest} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';

import Api from '../../api/standup';
import {WS_SERVER_URL} from '../../config/constants';
import {actions} from './standup';
import {StandupActionTypes as types} from './types';

const url = WS_SERVER_URL;

const wsAdminUrl = (name: string) => `${url}/admin/standups/${name}/start`;
const wsClientUrl = (name: string) => `${url}/client/standups/${name}/status`;

let ws: WebSocket;

// Sagas
const connect = (wsUrl: string) => {
    const websocket = new WebSocket(wsUrl);
    ws = websocket;
    return new Promise(resolve => {
        websocket.onopen = () => resolve(websocket)
    })
};

// Work out how to close old connections
const createWebSocketChannel = (socket: WebSocket) => eventChannel(emit => {
    const handler = (data: any) => emit(data);
    socket.onmessage = message => handler(message);
    return () => {
        socket.onmessage = null;
        socket.close();
    };
});

function* joinStandupWrapper(action: any) {
    const runningStandup = yield fork(joinStandup, action.payload);

    yield take(types.LEAVE);
    yield cancel(runningStandup);
}

// Admin a standup
function* adminTest(action: any) {

    // Do these in parallel
    const standup = yield call(getStandup, action.payload);
    const isLive = yield call(Api.isStandupLive, action.payload);

    if (standup && isLive) {
        yield call(joinAdminStandupWrapper, action)
    } else {
        yield take(types.START);
        yield call(startAdminStandupWrapper, action)
    }
}

function* joinAdminStandupWrapper(action: any){
    const runningStandup = yield fork(joinStandupAsAdmin, action.payload, "join");

    yield take(types.LEAVE);
    yield cancel(runningStandup);
}

// Admin a standup
function* startAdminStandupWrapper(action: any) {
    const runningStandup = yield fork(joinStandupAsAdmin, action.payload, "start");

    yield take(types.LEAVE);
    yield cancel(runningStandup);
}


function* joinStandupAsAdmin(name: string, message: string) {
    try {
        const socket = yield call(connect, wsAdminUrl(name));
        const channel = yield call(createWebSocketChannel, socket);
        socket.send("connect");
        socket.send(message);
        yield fork(standupRead, channel);
    } finally {
        if (yield cancelled()) {
            console.log("LEFT STANDUP")
        }
    }
}

// Joining a standup
function* joinStandup(name: string) {
    try {
        const standup = yield call(getStandup, name);

        if (standup) {
            const socket = yield call(connect, wsClientUrl(name));
            const channel = yield call(createWebSocketChannel, socket);
            yield fork(standupRead, channel);
        }
    } finally {
        if (yield cancelled()) {
            console.log("LEFT STANDUP")
        }
    }
}

function* getStandupWrapper(action: any) {
    const standup = yield call(getStandup, action.payload);
}

function* getStandup(name: string) {
    try {
        const standup = yield call(Api.getStandupByName, name);
        yield put(actions.initialiseStandup(standup))
        return standup
    } catch (e) {
        yield put(actions.errorInitialisingStandup(name, e.message))
    }
}

function* standupRead(channel: any) {
    while (true) {
        const payload = yield take(channel);
        const data = JSON.parse(payload.data);
        // Add better check for data.message  --> Ensure the message contains leave or something similar
        if (!data.message) {
            yield put(actions.updateStandup(data));
        } else if (data.message.includes("finished")) {
            yield put(actions.leaveStandup("dummyName"));
        }
    }
}

function* pauseStandup() {
    while (true) {
        yield take(types.PAUSE);
        ws.send("pause");
    }
}

function* unpauseStandup() {
    while (true) {
        yield take(types.UNPAUSE);
        ws.send("unpause");
    }
}
    
function* nextSpeaker() {
    while (true) {
        yield take(types.NEXT_SPEAKER);
        ws.send("next");
    }
}

function* joinStandupListener() {
    yield takeLatest(types.JOIN, joinStandupWrapper);
}

function* getStandupListener() {
    yield takeLatest(types.GET_BY_NAME, getStandupWrapper);
}

function* startStandupListener() {
    yield takeLatest(types.LOAD, adminTest);
}

function* editStandup(action: any) {
    try {
        yield call(Api.editStandup, action.payload.standup);
        yield call(action.payload.onSuccess)
    } catch (e) {
        yield call(action.payload.onError, e.code)
    }
}

function* createStandup(action: any) {
    try {
        yield call(Api.createStandup, action.payload.standup);
        yield call(action.payload.onSuccess)
    } catch (e) {
        yield call(action.payload.onError, e.code)
    }
}

function* editStandupListener() {
    yield takeLatest(types.EDIT, editStandup)
}

function* createStandupListener() {
    yield takeLatest(types.CREATE, createStandup)
}

const combinedSagas = [
    startStandupListener(),
    joinStandupListener(),
    getStandupListener(),
    editStandupListener(),
    createStandupListener(),
    pauseStandup(),
    nextSpeaker(),
    unpauseStandup(),
];

export default combinedSagas;