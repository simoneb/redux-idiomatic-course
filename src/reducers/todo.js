const todo = (state = null, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
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
    default:
      return state
  }
}

export default todo