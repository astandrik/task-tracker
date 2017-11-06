/*
 *
 * TaskList actions
 *
 */

import {
  GET_TASKS,
  SET_TASKS
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
