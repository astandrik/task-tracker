import { createSelector } from 'reselect';

/**
 * Direct selector to the taskList state domain
 */
const selectTaskListDomain = (state) => state.get('taskList');

/**
 * Other specific selectors
 */


/**
 * Default selector used by TaskList
 */

const makeSelectTaskList = () => createSelector(
  selectTaskListDomain,
  (substate) => substate.toJS()
);

export default makeSelectTaskList;
export {
  selectTaskListDomain,
};
