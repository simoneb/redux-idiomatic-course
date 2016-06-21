import { createStore } from 'redux'
import _ from 'lodash'
import reducers from './reducers'

const configureStore = () => {
  const loadState = () => {
    try {
      return JSON.parse(localStorage.getItem('todoState'))
    }
    catch (err) {
      console.error('error loading state', err.message)
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

  let store = createStore(reducers, loadState() || undefined)

  store.subscribe(_.throttle(saveState, 1000))

  return store
}

export default configureStore