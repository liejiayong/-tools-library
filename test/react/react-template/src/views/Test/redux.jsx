import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import counterAction from '@/stores-redux/action/couter'
import { Button } from '@/components/index'

class ReduxTest extends Component {
  // construtor() {

  // }
  render() {
    const { count } = this.props
    const { add, descrease, addAsync } = this.props

    return (
      <Fragment>
        <div>ReduxTest</div>
        <p>count is: {count}</p>
        <Button onClick={() => add(1)}>add</Button>
        <Button onClick={() => descrease(1)}>descrease</Button>
        <Button onClick={() => addAsync(1)}>addAsync</Button>
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  // state代表的store.getState()
  console.log('redux page mapState:', state)
  return {
    count: state.counter.count,
  }
}

export default connect(mapStateToProps, counterAction)(ReduxTest)
