import {v4} from 'node-uuid'

const fakeDatabase = {
  todos: [{
    id: v4(),
    text: 'buy milk',
    completed: true
  }, {
    id: v4(),
    text: 'go to school'
  }, {
    id: v4(),
    text: 'do homework'
  }]
}

const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout))

export const addTodo = text =>
    delay(500).then(() => {
      const todo = {
        id: v4(),
        text
      }

      fakeDatabase.todos.push(todo)
      return todo
    })

export const toggleTodo = id =>
    delay(500).then(() => {
      const todo = fakeDatabase.todos.find(t => t.id === id)
      todo.completed = !todo.completed
      return todo
    })

export const fetchTodos = filter => {
  return delay(500).then(() => {
    if (Math.random() > 0.8) {
      throw new Error('Boom!')
    }

    switch (filter) {
      case 'all':
      case 'bundle':
        return fakeDatabase.todos
      case 'active':
        return fakeDatabase.todos.filter(t => !t.completed)
      case 'completed':
        return fakeDatabase.todos.filter(t => t.completed)
      default:
        throw new Error(`Unknown filter ${filter}`)
    }
  })
}
