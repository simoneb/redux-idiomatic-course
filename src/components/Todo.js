import React from 'react'

export default props =>
    <li key={props.todo.id}
        onClick={() => props.onClick(props.todo.id)}
        style={{
         textDecoration: props.todo.completed ?
         'line-through' :
         'none'
      }}>
      {props.todo.text}
    </li>
