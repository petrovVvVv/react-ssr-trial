import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { StaticPage } from '../StaticPage'
import { HomePage } from '../HomePage'

import './app.style';

// export entry application component
export class App extends React.Component {
  render() {
    console.log('App.render()')

    return (
      <div className="ui-app">
        <Switch>
          <Route path="/" exact={true} render={() => <HomePage />} />
          <Route path="/*" component={StaticPage} />
        </Switch>
      </div>
    )
  }
}
