import React from 'react'
import { connect } from 'react-redux'
import { incrementCounter } from './actions'

const Counter = ({ count, increment }) => (
  <div>
    <p>Count: {count}</p>
    <button onClick={() => increment(1)}>Increment</button>
  </div>
)

const mapStateToProps = state => ({
  count: state.counter
})

const mapDispatchToProps = {
  increment: incrementCounter
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)

