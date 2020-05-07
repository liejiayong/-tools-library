import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { add } from '@/stores-redux/action/couter'

class ReduxTest extends Component {
  // construtor() {

  // }
  render() {
    const { count } = this.props
    const { countAdd } = this.props

    return (
      <Fragment>
        <div>ReduxTest</div>
        <p>count is: {count}</p>
        <button onClick={() => countAdd(count+1)}>add</button>
      </Fragment>
    )
  }
}

function mapState(state) {
  console.log('redux page mapState:', state)
  return {
    count: state.count,
  }
}
const mapDispatchToProps = (dispatch) => {
  console.log('redux page mapDispatchToProps:')
  return {
    countAdd: (count) => {
      dispatch(add(count))
    },
  }
}
export default connect(mapState, mapDispatchToProps)(ReduxTest)
