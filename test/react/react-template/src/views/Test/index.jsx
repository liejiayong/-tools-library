import React, { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react'
import { Button } from '@/components'
// import './style.module.less'
import styles from './style.module.less'

@inject('counter', 'post', 'input')
@observer
class Test extends Component {
  render() {
    const {
      state: { firstName, lastName },
      fullName,
      onNameChange,
    } = this.props.input
    const { count, add, addSync, sub } = this.props.counter
    const { list } = this.props.post
    return (
      <Fragment>
        <div className="container g-container">
          home
          <input
            className="ele-input"
            type="text"
            value={firstName}
            maxLength={12}
            placeholder="first name"
            onChange={(e) => onNameChange('firstName', e.target.value)}
          />
          <input
            className="ele-input"
            type="text"
            value={lastName}
            maxLength={12}
            placeholder="last name"
            onChange={(e) => onNameChange('lastName', e.target.value)}
          />
          <p className="tips">your full name is :</p>
          <p className="full-name">{fullName}</p>
        </div>
        <div className={styles.container}>
          <p>count: {count}</p>
          <Button onClick={add}>add</Button>
          <Button onClick={sub}>sub</Button>
          <Button theme="dark" onClick={addSync}>
            addSync
          </Button>

          <hr />
          <p>posts: {list.length}</p>
        </div>
      </Fragment>
    )
  }
}

export default Test
