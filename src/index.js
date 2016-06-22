import ReactDOM from 'react-dom'
import React from 'react'
import Root from './components/Root'
import configureStore from './configureStore'

const store = configureStore()

let root = document.createElement('div')
document.body.appendChild(root)

ReactDOM.render(<Root store={store} />, root)
