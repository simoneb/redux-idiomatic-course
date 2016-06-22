import React, {Component} from 'react'
import TodoList from './TodoList'
import * as actions from '../actions'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {getVisibleTodos, getIsFetching, getErrorMessage} from '../reducers'
import FetchError from './FetchError'

class VisibleTodoList extends Component {
  componentDidMount () {
    this.fetchData()
  }

  componentDidUpdate (prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData()
    }
  }

  fetchData () {
    const {filter, fetchTodos} = this.props
    fetchTodos(filter).then(() => console.log('received todos'))
  }

  render () {
    const {toggleTodo, todos, errorMessage, isFetching} = this.props

    if (isFetching && !todos.length) {
      return <p>Loading...</p>
    }

    if (errorMessage && !todos.length) {
      return (
          <FetchError
              message={errorMessage}
              onRetry={() => this.fetchData()}
          />)
    }

    return (
        <TodoList
            todos={todos}
            onTodoClick={toggleTodo}
        />
    )
  }
}


const mapStateToProps = (state, {params: {filter = 'all'}}) => ({
  todos: getVisibleTodos(state, filter),
  isFetching: getIsFetching(state, filter),
  errorMessage: getErrorMessage(state, filter),
  filter
})

export default withRouter(connect(
    mapStateToProps,
    actions
)(VisibleTodoList))
