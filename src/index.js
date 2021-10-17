import React, { lazy, Suspense } from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Main from './Main'
import Navbar from './Navbar'

const Orders = lazy(() => import('./Orders'))
const RedirectTo = lazy(() => import('./RedirectTo'))

render(
  <React.StrictMode>
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Main} />
          <Route path='/Orders' component={Orders} />
          <Route path='/RedirectTo' component={RedirectTo} />
        </Switch>
      </Suspense>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
