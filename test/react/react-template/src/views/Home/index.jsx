import React, { Component, Fragment } from 'react'
import { apiGetPosts } from '@/api/index'

class Home extends Component {
  componentDidMount() {
    apiGetPosts()
      .then(res => {
        console.log('cnodejs', res)
      })
      .catch(err => {
        console.log('抓到错误', err)
      })
  }

  render() {

    return (
      <Fragment>
        <div className="">
          home
        </div>
      </Fragment>
    )
  }
}

export default Home
