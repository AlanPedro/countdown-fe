import { all, call, fork, put, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import Api from '../../api/standup';
import { actions, types } from './standup';

const url = `172.22.121.28:9000`;
const wsAdminUrl = (name) => `${url}/admin/standups/${name}/start`;
const wsClientUrl = (name) => `${url}/client/standups/${name}/status`;

let ws;

// Sagas
const connect = wsUrl => {
    const websocket = new WebSocket("ws://" + wsUrl);
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

// Joining a standup
function* joinStandup() {
    const action = yield take(types.JOIN);
    const standup = yield call(getStandup, action.payload.name);
    if (standup) {
        yield put(actions.initialiseStandup(standup))
        
        const socket = yield call(connect, wsClientUrl(action.payload.name));
        const channel = yield call(createWebSocketChannel, socket);
        yield fork(standupRead, channel);
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
function* startStandup() {
    const action = yield take(types.LOAD);
    const standup = yield call(getStandup, action.payload.name);

    if (standup) {
        yield put(actions.initialiseStandup(standup))
        const socket = yield call(connect, wsAdminUrl(action.payload.name));
        const channel = yield call(createWebSocketChannel, socket);
        
        yield take(types.START);
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

function* getAllStandups() {
    yield take(types.GET_ALL)
    try {
        const allStandups = yield call(Api.getAllStandups)
        yield put(actions.getAllStandupsSuccess(allStandups))
    } catch (e) {
        yield put(actions.getAllStandupsFailure(e.message))
    }
}

function* rootSaga() {
    yield all([
        getAllStandups(),
        startStandup(),
        joinStandup(),
        pauseStandup(),
        nextSpeaker()
      ])
}

export default rootSaga;