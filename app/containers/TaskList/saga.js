import { put, takeEvery, call } from 'redux-saga/effects';

import { GET_TASKS, SET_TASKS, UPDATE_TASK } from './constants';

function fetchData() {
    return fetch('/api/tasks').then((response) => response.json());
}

function updateTask({ id, value }) {
    return fetch('/api/tasks', {
        method: 'POST',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, value }) }).then((responses) => responses.json);
}

function* fetchTasks() {
    const data = yield call(fetchData);
    yield put({ type: SET_TASKS, data: data.tasks });
}

function* updateTaskValue({ id, value }) {
    yield call(updateTask, { id, value });
}

function* tasksSaga() {
    yield takeEvery(GET_TASKS, fetchTasks);
    yield takeEvery(UPDATE_TASK, updateTaskValue);
}

export default tasksSaga;
