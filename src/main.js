import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'
import { createStore, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import { v4 } from 'node-uuid'
import _ from 'lodash'

const addTodo = text => ({
  type: 'ADD_TODO',
  text,
  id: v4()
})

const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id
})    

const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

const todo = (state = null, action) => {
  switch(action.type) {
    case 'ADD_TODO': return {
      text: action.text,
      id: action.id,
      completed: false
    }
    case 'TOGGLE_TODO': 
      return state.id === action.id ?
        { 
          text: state.text, 
          id: state.id, 
          completed: !state.completed
        } :
        state
     default: return state
  }
}

const todos = (state = [], action) => {
  switch(action.type) {
    case 'ADD_TODO': 
      return [
        todo(undefined, action),
        ...state
      ]
    case 'TOGGLE_TODO': 
      return state.map(t => todo(t, action))
    default: return state
  }
}

const getVisibleTodos = (todos, filter) => {
  switch(filter) {
    case 'SHOW_ALL': return todos
    case 'SHOW_COMPLETED': return todos.filter(t => 
      t.completed)
    case 'SHOW_ACTIVE': return todos.filter(t =>
      !t.completed)
  }
}

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch(action.type) {
    case 'SET_VISIBILITY_FILTER': 
      return action.filter
    default: return state
  }
}

const Link = props => {
  return (
    props.active ?
    <span>{props.children}</span> :
    <a 
      href="#" 
      onClick={e => {
        e.preventDefault()
        props.onClick()
      }}>
      {props.children}
    </a>
  )
}

const FilterLink = connect(
  (state, props) => ({
    active: state.visibilityFilter === props.filter
  }),
  (dispatch, ownProps) => ({
    onClick: () => dispatch(setVisibilityFilter(ownProps.filter))
  })
)(Link) 

const Todo = props => 
  <li key={props.todo.id}
      onClick={() => props.onClick(props.todo.id)}
      style={{
         textDecoration: props.todo.completed ?
         'line-through' :
         'none'
      }}>
        {props.todo.text}
  </li>
  
const mapStateToProps = state => ({
  todos: getVisibleTodos(
    state.todos,
    state.visibilityFilter
  )
})

const mapDispatchToProps = ({
  onTodoClick: toggleTodo
})

const TodoList = props => {
  return (
    <ul>
      {props.todos.map(todo =>
        <Todo 
          key={todo.id}
          id={todo.id} 
          todo={todo} 
          onClick={props.onTodoClick} />
      )}
    </ul>
  )
}
  
const VisibleTodoList = connect(
  mapStateToProps, 
  mapDispatchToProps
)(TodoList)

const AddTodo = connect(
  null,
  { addTodo }
)(props => {
  let input
  
  return (
    <div>
    <input ref={node => { input = node }} />
    <button onClick={e => {
      props.addTodo(input.value)
      input.value = ''
    }}>
      Add todo
    </button>
    </div>
  )
})

const Footer = props => {
  return (
    <p>
      Show:
      {' '}
      <FilterLink 
        filter='SHOW_ALL'>
        All
      </FilterLink>
      {' '}
      <FilterLink 
        filter='SHOW_ACTIVE'>
        Active
      </FilterLink>
      {' '}
      <FilterLink 
        filter='SHOW_COMPLETED'>
        Completed
      </FilterLink>
    </p>
  )
}

const App = props => {
    return (
      <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
      </div>
    )
}

const loadState = () => {
  try {
    return  JSON.parse(localStorage.getItem('todoState'))
  }
  catch (err) {
    console.error('error loading stte', err.message)
  }
}

const saveState = () => {
  try {
    localStorage.setItem('todoState', JSON.stringify(store.getState()))
  } 
  catch (err) {
    console.error('error saving state', err.message)
  }
}

let store = createStore(combineReducers({
  todos,
  visibilityFilter
}), loadState() || undefined)

store.subscribe(_.throttle(saveState, 1000))

let root = document.createElement('div')
document.body.appendChild(root)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  root)