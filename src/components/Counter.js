import React from 'react'
import { connect } from 'react-redux'
import { increment, decrement } from '../actions/counter'

const mapStateToProps = state => ({
    count: state.count,
})

const mapDispatchToProps = dispatch => ({
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement()),
})

const Counter = (props) => (
  <div>
    Counter: {props.count}
    <br/>
    <button onClick={props.increment}>+</button>
    <button onClick={props.decrement}>-</button>
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
