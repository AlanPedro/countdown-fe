import { takeEvery, takeLatest, call, put, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import { INIT_STANDUP, GET_STANDUP, ERROR_INIT_STANDUP, START_TIMER, LIVE_UPDATE } from '../actions';
import { dummyApi } from '../api/dummy';
import Api from '../api/standup';

/*

    API calls -> Get standup
              -> Create standup
              -> Edit standup
              -> Sockets stuff

*/

let ws;

const connect = () => {
    ws = new WebSocket("ws://localhost:8080");
    return new Promise(resolve => {
        ws.onopen = () => resolve(ws)
    })
}

const createWebSocketChannel = socket => eventChannel(emit => {
    const handler = data => {
        console.log(data)
        emit(data);
    }
    ws.onmessage = message => handler(message);
    return () => ws.close;
})

function* startStandup(action) {
    const socket = yield call(connect)
    const socketChannel = yield call(createWebSocketChannel, socket);
    ws.send(JSON.stringify( {type: "START_TIMER", payload: action.payload}));
    while (true) {
        const payload = yield take(socketChannel);
        yield put({type: LIVE_UPDATE, payload: JSON.parse(payload.data)});
    }
}

function* getStandup(action) {
    try {
        const standup = yield call(Api.getStandup, action.payload)
        // const standup = yield call(dummyApi, action.payload)
        yield put({ type: INIT_STANDUP, payload: standup})
    } catch (e) {
         yield put({ type: ERROR_INIT_STANDUP, payload: { standupId: action.payload.standupId, message: e.message}})
    }
}

function* rootSaga() {
    yield takeEvery(GET_STANDUP, getStandup);
    yield takeLatest(START_TIMER, startStandup);
    // yield takeLatest(STOP_TIMER, startStandup);
}

export default rootSaga;