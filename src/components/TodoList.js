import React from 'react'
import Todo from './Todo'

export default props => {
  return (
      <ul>
        {props.todos.map(todo =>
            <Todo
                key={todo.id}
                id={todo.id}
                todo={todo}
                onClick={props.onTodoClick}/>
        )}
      </ul>
  )
}
