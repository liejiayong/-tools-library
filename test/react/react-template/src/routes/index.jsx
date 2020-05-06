import React, { Component, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '@/views/Home/index'
import Test from '@/views/Test/index'
import Redux from '@/views/Test/redux'

// @withRouter
class Routes extends Component {
  render() {
    return (
      <Suspense fallback={<p>loading...</p>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/test" component={Test} />
          <Route exact path="/redux" component={Redux} />

          <Route render={() => <h1>404</h1>} />
        </Switch>
      </Suspense>
    )
  }
}

export default Routes
