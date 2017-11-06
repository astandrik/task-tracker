/*
 *
 * TaskList reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SET_TASKS
} from './constants';

const initialState = fromJS({
    tasks: []
});

function taskListReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TASKS:
            return state.set('tasks', action.data);
        default:
            return state;
    }
}

export default taskListReducer;
