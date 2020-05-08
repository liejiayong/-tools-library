import React, { Component, Suspense, lazy } from 'react'
import { Route, Switch } from 'react-router-dom'
// import Home from '@/views/Home/index'
// import Test from '@/views/Test/index'
// import Redux from '@/views/Test/redux'

// lazy load
const LazyLoad = (path) =>
  lazy(() => {
    return new Promise((resolve) => setTimeout(resolve, 3 * 1000))
      .then(() => import(`@/views/${path}`))
      .catch(() => import('@/views/Home/index'))
  })

// @withRouter
class Routes extends Component {
  render() {
    return (
      <Suspense fallback={<p>loading...</p>}>
        <Switch>
          <Route exact path="/" component={LazyLoad('Home/index')} />
          <Route exact path="/test" component={LazyLoad('Test/index')} />
          <Route exact path="/redux" component={LazyLoad('Test/redux')} />

          <Route render={() => <h1>404</h1>} />
        </Switch>
      </Suspense>
    )
  }
}

export default Routes
