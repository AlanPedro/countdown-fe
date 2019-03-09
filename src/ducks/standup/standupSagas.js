import { all, call, fork, put, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import Api from '../../api/standup';
import { actions, types } from './standup';

let ws;

// Sagas
const connect = () => {
    const websocket = new WebSocket("ws://localhost:8080");
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

function* standupFlow() {
    yield take(types.INITIALISE);
    const socket = yield call(connect);
    yield fork(standupRead, socket);
}

function* standupRead(socket) {
    const channel = yield call(createWebSocketChannel, socket);
    yield take(types.START);
    socket.send(JSON.stringify(actions.startStandup()))
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

function* getStandup() {
    const action = yield take(types.GET_BY_NAME);
    try {
        const standup = yield call(Api.getStandupByName, action.payload.name)
        yield put(actions.initialiseStandup(standup))
    } catch (e) {
         yield put(actions.errorInitialisingStandup(action.payload.id, e.message))
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
        getStandup(),
        getAllStandups(),
        standupFlow(),
        pauseStandup(),
        nextSpeaker()
      ])
}

export default rootSaga;