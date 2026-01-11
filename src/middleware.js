const customMiddleware = store => next => action => {
  // Perform tasks before the action reaches the reducer
  // console.log('Middleware triggered:', action)

  // Pass the action to the next middleware or the reducer
  next(action)
}

export default customMiddleware

