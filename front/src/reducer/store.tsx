import { createStore } from 'redux'
import reducer from './reducer'



let store = createStore(reducer)
let dispatch = store.dispatch
export { store, dispatch }