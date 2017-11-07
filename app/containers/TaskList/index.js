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
import { autobind } from 'core-decorators';
import RaisedButton from 'material-ui/RaisedButton';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectTaskList from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getTasks, updateTaskValue, addTask, deleteTask } from './actions';
import Task from '../../components/Task';

export class TaskList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    componentDidMount() {
        this.props.fetchTasks();
    }

    @autobind
    handleTaskAdd() {
        this.props.addTask();
    }

    render() {
        const tasks = this.props.taskList.tasks.map((task) => (
            <div key={task.id}>
                  <Task task={task} updateTaskValue={this.props.updateTaskValue} deleteTask={this.props.deleteTask}/>
            </div>
        ));
        return (
          <div>
            <Helmet>
              <title>TaskList</title>
              <meta name="description" content="Description of TaskList" />
            </Helmet>
            { tasks }
            <RaisedButton
                label="Добавить"
                primary
                onClick={this.handleTaskAdd}
            />
          </div>
        );
    }
}

TaskList.propTypes = {
    fetchTasks: PropTypes.func.isRequired,
    addTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    updateTaskValue: PropTypes.func.isRequired,
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
        },
        updateTaskValue: ({ id, value }) => {
            dispatch(updateTaskValue({ id, value }));
        },
        addTask: () => {
            dispatch(addTask());
        },
        deleteTask: ({ id }) => {
            dispatch(deleteTask({ id }));
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
