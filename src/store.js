import { createStore, applyMiddleware } from 'redux'
import rootReducer from './rootReducer'

import customMiddleware from './middleware'

const store = createStore(rootReducer, applyMiddleware(customMiddleware))

export default store

