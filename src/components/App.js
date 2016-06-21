import React from 'react'
import AddTodo from './AddTodo'
import VisibleTodoList from './VisibleTodoList'
import Footer from './Footer'

export default () => {
  return (
      <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
      </div>
  )
}
