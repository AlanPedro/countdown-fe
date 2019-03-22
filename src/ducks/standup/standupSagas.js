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

const createWebSocketChannel = socket => eventChannel(emit => {
    const handler = data => emit(data);
    socket.onmessage = message => handler(message);
    return () => socket.close;
});

function* joinStandupWrapper(action) {
    const runningStandup = yield fork(joinStandup, action.payload.name);

    yield take(types.LEAVE);
    yield cancel(runningStandup);
}

// Admin a standup
function* startStandupWrapper(action) {
    const runningStandup = yield fork(startStandup, action.payload.name);

    yield take(types.LEAVE);
    yield cancel(runningStandup);
}

// Joining a standup
function* joinStandup(name) {
    try {
        const standup = yield call(getStandup, name);
        if (standup) {
            yield put(actions.initialiseStandup(standup));
            
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

function* getStandup(name) {
    try {
        return yield call(Api.getStandupByName, name);
    } catch (e) {
        yield put(actions.errorInitialisingStandup(name, e.message))
    }
}

function* startStandup(name) {
    try {
        const standup = yield call(getStandup, name);

        if (standup) {
            yield put(actions.initialiseStandup(standup));

            yield take(types.START);
            const socket = yield call(connect, wsAdminUrl(name));
            const channel = yield call(createWebSocketChannel, socket);

            socket.send("start");
            yield fork(standupRead, channel);
        }
    } finally {
        if (yield cancelled()) {
            console.log("LEFT STANDUP")
        }
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

function* startStandupListener() {
    yield takeLatest(types.LOAD, startStandupWrapper);
}

const combinedSagas = [
    startStandupListener(),
    joinStandupListener(),
    pauseStandup(),
    nextSpeaker(),
    unpauseStandup()
];

export default combinedSagas;