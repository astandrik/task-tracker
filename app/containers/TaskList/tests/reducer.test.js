
import { fromJS } from 'immutable';
import taskListReducer from '../reducer';

describe('taskListReducer', () => {
    it('returns the initial state', () => {
        expect(taskListReducer(undefined, {})).toEqual(fromJS({}));
    });
});
