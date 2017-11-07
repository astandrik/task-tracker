import { put, takeEvery, call } from 'redux-saga/effects';

import { GET_TASKS, SET_TASKS, UPDATE_TASK, ADD_TASK, DELETE_TASK } from './constants';

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

function addNewTask() {
    return fetch('/api/tasks', { method: 'POST',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: -1 }) }).then((response) => response.json());
}

function deleteExistingTask({ id }) {
    return fetch('/api/tasks', { method: 'DELETE',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id }) }).then((response) => response.json());
}

function* deleteTask({ id }) {
    yield call(deleteExistingTask, { id });
    yield fetchTasks();
}

function* fetchTasks() {
    const data = yield call(fetchData);
    yield put({ type: SET_TASKS, data: data.tasks });
}

function* updateTaskValue({ id, value }) {
    yield call(updateTask, { id, value });
}

function* addTask() {
    yield call(addNewTask);
    yield fetchTasks();
}

function* tasksSaga() {
    yield takeEvery(GET_TASKS, fetchTasks);
    yield takeEvery(UPDATE_TASK, updateTaskValue);
    yield takeEvery(ADD_TASK, addTask);
    yield takeEvery(DELETE_TASK, deleteTask);
}

export default tasksSaga;
