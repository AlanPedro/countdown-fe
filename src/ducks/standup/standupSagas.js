import { call, fork, put, take, cancel, cancelled, takeLatest } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import Api from '../../api/standup';
import { WS_SERVER_URL } from '../../config/constants';
import { actions, types } from './standup';

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
}

const createWebSocketChannel = socket => eventChannel(emit => {
    const handler = data => emit(data);
    socket.onmessage = message => handler(message);
    return () => socket.close;
})

function* joinStandupWrapper(action) {
    const runningStandup = yield fork(joinStandup, action.payload.name);

    yield take("LEAVE_STANDUP");
    yield cancel(runningStandup);
}

// Joining a standup
function* joinStandup(name) {
    try {
        const standup = yield call(getStandup, name);
        if (standup) {
            yield put(actions.initialiseStandup(standup))
            
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
        const result = yield call(Api.getStandupByName, name)
        return result;
    } catch (e) {
        yield put(actions.errorInitialisingStandup(name, e.message))
    }
}

// Admin page
function* startStandup(action) {
    const standup = yield call(getStandup, action.payload.name);

    if (standup) {
        yield put(actions.initialiseStandup(standup))

        yield take(types.START)
        const socket = yield call(connect, wsAdminUrl(action.payload.name));
        const channel = yield call(createWebSocketChannel, socket);
        
        socket.send("start");
        yield fork(standupRead, channel);
    }
}

function* standupRead(channel) {
    while (true) {
        const payload = yield take(channel);
        const data = JSON.parse(payload.data);
        if (!data.message) {
            yield put(actions.updateStandup(data));
        } else {
            yield put({type: "LEAVE_STANDUP"});
        }
    }
}

function* pauseStandup() {
    while (true) {
        yield take(types.PAUSE);
        ws.send("pause");
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
    yield takeLatest(types.LOAD, startStandup);
}

const combinedSagas = [
    startStandupListener(),
    joinStandupListener(),
    pauseStandup(),
    nextSpeaker()
]

export default combinedSagas;