import { all, call, fork, put, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import Api from '../../api/standup';
import { actions, types } from './standup';

let ws;

// Sagas
const connect = name => {
    const websocket = new WebSocket("ws://localhost:8080/standups/" + name);
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
    yield put(actions.initialiseStandup(standup))
    
    const socket = yield call(connect, action.payload.name);
    const channel = yield call(createWebSocketChannel, socket);
    yield fork(standupRead, channel);
}

function* getStandup(name) {
    try {
        return yield call(Api.getStandupByName, name)
    } catch (e) {
        yield put(actions.errorInitialisingStandup(name, e.message))
    }
}

// Admin page
function* startStandup() {
    const action = yield take(types.LOAD);
    const standup = yield call(getStandup, action.payload.name);
    yield put(actions.initialiseStandup(standup))
    
    const socket = yield call(connect, action.payload.name);
    const channel = yield call(createWebSocketChannel, socket);
    
    yield take(types.START);
    socket.send(JSON.stringify(actions.startStandup()));
    yield fork(standupRead, channel);
}

function* standupRead(channel) {
    while (true) {
        const payload = yield take(channel);
        yield put(actions.updateStandup(JSON.parse(payload.data)));
    }
}

function* pauseStandup() {
    while (true) {
        yield take(types.PAUSE);
        ws.send(JSON.stringify(actions.pauseStandup()));
    }
}
    
function* nextSpeaker() {
    while (true) {
        yield take(types.NEXT_SPEAKER);
        ws.send(JSON.stringify(actions.toNextSpeaker()));
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