/*
 *
 * TaskList actions
 *
 */

import {
  GET_TASKS,
  SET_TASKS,
  UPDATE_TASK
} from './constants';

export function getTasks() {
    return {
        type: GET_TASKS
    };
}

export function setTasks(data) {
    return {
        type: SET_TASKS,
        data
    };
}

export function updateTaskValue({ id, value }) {
    return {
        type: UPDATE_TASK,
        id,
        value
    };
}
