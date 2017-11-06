/**
*
* Task
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { autobind } from 'core-decorators';
import { debounce } from 'lodash-decorators';
// import styled from 'styled-components';


class Task extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state={
        message: ''
    }

    componentWillMount() {
        this.setState({
            message: this.props.task.message
        });
    }

    @debounce(400)
    updateValue({ id, value }) {
        this.props.updateTaskValue({ id, value });
    }

    @autobind
    handleChange(event, value) {
        this.setState({
            message: value
        });
        this.updateValue({ id: this.props.task.id, value });
    }

    render() {
        return (
            <div>
                <TextField
                    value={this.state.message}
                    id={this.props.task.id.toString()}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

Task.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.number,
        message: PropTypes.string
    }),
    updateTaskValue: PropTypes.func.isRequired
};

export default Task;
