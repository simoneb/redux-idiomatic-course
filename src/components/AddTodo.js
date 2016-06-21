import React from 'react'
import {addTodo} from '../actions'
import { connect } from 'react-redux'

export default connect(
    null,
    {addTodo}
)(props => {
  let input

  return (
      <div>
        <input ref={node => { input = node }}/>
        <button onClick={e => {
      props.addTodo(input.value)
      input.value = ''
    }}>
          Add todo
        </button>
      </div>
  )
})
