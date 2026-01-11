import { combineReducers } from 'redux'
import counterReducer from './counterReducer'

const rootReducer = combineReducers({
  counter: counterReducer
  // Add more reducers as needed
})

export default rootReducer

