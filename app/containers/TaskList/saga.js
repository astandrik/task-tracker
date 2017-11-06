import { put, takeEvery, call } from 'redux-saga/effects';

import { GET_TASKS, SET_TASKS } from './constants';

function fetchData() {
    return fetch('/api/tasks').then((response) => response.json());
}

function* fetchTasks() {
    const data = yield call(fetchData);
    yield put({ type: SET_TASKS, data: data.tasks });
}

function* tasksSaga() {
    yield takeEvery(GET_TASKS, fetchTasks);
}

export default tasksSaga;
