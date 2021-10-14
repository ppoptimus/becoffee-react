import React, { lazy, Suspense } from 'react'
import { render } from 'react-dom'
import OutsideAlerter from './Test';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import Orders from './Orders';

const Orders = lazy(() => import('./Orders'))

render(
  <React.StrictMode>
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path='/Orders' component={Orders} />
      </Switch>
      </Suspense>
    </Router>
    {/* <Orders/> */}
    <OutsideAlerter />
  </React.StrictMode>,
  document.getElementById('root')
)
