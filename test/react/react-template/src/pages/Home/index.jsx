import React, { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react'

import { apiGetCNodejsTopics } from '@/api/test'
import './style.global.less'

@inject('counter', 'post')
@observer
class Home extends Component {
  componentDidMount() {
    apiGetCNodejsTopics()
      .then(res => {
        console.log('cnodejs', res)
      })
      .catch(err => {
        console.log('抓到错误', err)
      })
  }

  render() {
    const {
      state: { firstName, lastName },
      fullName,
      onNameChange,
    } = this.props.TestStore
    return (
      <Fragment>
        <div className="container g-container">
          <input
            className="ele-input"
            type="text"
            value={firstName}
            maxLength={12}
            placeholder="first name"
            onChange={e => onNameChange('firstName', e.target.value)}
          />
          <input
            className="ele-input"
            type="text"
            value={lastName}
            maxLength={12}
            placeholder="last name"
            onChange={e => onNameChange('lastName', e.target.value)}
          />
          <p className="tips">your full name is :</p>
          <p className="full-name">{fullName}</p>
        </div>
      </Fragment>
    )
  }
}

export default Home
