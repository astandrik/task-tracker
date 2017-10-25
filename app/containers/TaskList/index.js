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

export class TaskList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
          <div>
            <Helmet>
              <title>TaskList</title>
              <meta name="description" content="Description of TaskList" />
            </Helmet>
          </div>
        );
    }
}

TaskList.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    taskList: makeSelectTaskList(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
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
