/**
 *
 * TaskList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectTaskList from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getTasks } from './actions';

export class TaskList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    componentDidMount() {
        this.props.fetchTasks();
    }

    render() {
        const tasks = this.props.taskList.tasks.map((task) => (
            <div key={task.id}>
                  <span>{ task.message }</span>
            </div>
        ));
        return (
          <div>
            <Helmet>
              <title>TaskList</title>
              <meta name="description" content="Description of TaskList" />
            </Helmet>
            { tasks }
          </div>
        );
    }
}

TaskList.propTypes = {
    fetchTasks: PropTypes.func.isRequired,
    taskList: PropTypes.shape({
        tasks: PropTypes.arrayOf(PropTypes.shape({}))
    })
};

const mapStateToProps = createStructuredSelector({
    taskList: makeSelectTaskList(),
});

function mapDispatchToProps(dispatch) {
    return {
        fetchTasks: () => {
            dispatch(getTasks());
        }
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'taskList', reducer });
const withSaga = injectSaga({ key: 'taskList', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TaskList);
