import {call, cancel, cancelled, fork, put, take, takeLatest} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';

import Api from '../../api/standup';
import {WS_SERVER_URL} from '../../config/constants';
import {actions, types} from './standup';

const url = WS_SERVER_URL;

const wsAdminUrl = (name) => `${url}/admin/standups/${name}/start`;
const wsClientUrl = (name) => `${url}/client/standups/${name}/status`;

let ws;

// Sagas
const connect = wsUrl => {
    const websocket = new WebSocket(wsUrl);
    ws = websocket;
    return new Promise(resolve => {
        websocket.onopen = () => resolve(websocket)
    })
};

// Work out how to close old connections
const createWebSocketChannel = socket => eventChannel(emit => {
    const handler = data => emit(data);
    socket.onmessage = message => handler(message);
    return () => {
        socket.onmessage = null;
        socket.close();
    };
});

function* joinStandupWrapper(action) {
    const runningStandup = yield fork(joinStandup, action.payload.name);

    yield take(types.LEAVE);
    yield cancel(runningStandup);
}

// Admin a standup
function* adminTest(action) {

    // Do these in parallel
    const standup = yield call(getStandup, action.payload.name);
    const isLive = yield call(Api.isStandupLive, action.payload.name);

    yield put(actions.initialiseStandup(standup));

    if (isLive) {
        yield call(joinAdminStandupWrapper, action)
    } else {
        yield take(types.START);
        yield call(startAdminStandupWrapper, action)
    }
}

function* joinAdminStandupWrapper(action){
    const runningStandup = yield fork(joinStandupAsAdmin, action.payload.name, "join");

    yield take(types.LEAVE);
    yield cancel(runningStandup);
}

// Admin a standup
function* startAdminStandupWrapper(action) {
    const runningStandup = yield fork(joinStandupAsAdmin, action.payload.name, "start");

    yield take(types.LEAVE);
    yield cancel(runningStandup);
}


function* joinStandupAsAdmin(name, message) {
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
function* joinStandup(name) {
    try {
        const standup = yield call(getStandup, name);

        yield put(actions.initialiseStandup(standup));

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

function* getStandupWrapper(action) {
    const standup = yield call(getStandup, action.payload.name);
    yield put(actions.initialiseStandup(standup))
}

function* getStandup(name) {
    try {
        return yield call(Api.getStandupByName, name);
    } catch (e) {
        yield put(actions.errorInitialisingStandup(name, e.message))
    }
}

function* standupRead(channel) {
    while (true) {
        const payload = yield take(channel);
        const data = JSON.parse(payload.data);
        // Add better check for data.message  --> Ensure the message contains leave or something similar
        if (!data.message) {
            yield put(actions.updateStandup(data));
        } else if (data.message.includes("finished")) {
            yield put(actions.leaveStandup());
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

function* editStandup(action) {
    try {
        yield call(Api.editStandup, action.payload.standup);
        yield call(action.payload.onSuccess)
    } catch (e) {
        yield call(action.payload.onError, e.code)
    }
}

function* createStandup(action) {
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