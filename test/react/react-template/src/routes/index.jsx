import React, { Component, Suspense } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import Home from '@/pages/Home'

@withRouter
class Routes extends Component {
  render() {
    return (
      <Suspense fallback={<p>loading...</p>}>
        <Switch>
          <Route exact path="/" component={Home} />

          <Route render={() => <h1>404</h1>} />
        </Switch>
      </Suspense>
    )
  }
}

export default Routes
