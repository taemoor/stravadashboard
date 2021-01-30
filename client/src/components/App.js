import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../actions'

import Header from './Header'
import Landing from './Landing'
import Progression from './Progression'
import Gear from './Gear'
import StravaImport from './StravaImport'
class App extends Component {
  componentDidMount() {
    this.props.fetchAthlete();
  }

  componentDidUpdate(prevProps) {
    if (this.props.auth.athleteActivitiesExist && !prevProps.auth.athleteActivitiesExist) {
      // this.props.importActivitiesFromStrava(false)
    }
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route path="/dashboard" component={Progression} />
            <Route path="/gear" component={Gear} />
            <Route path="/stravaimport" component={StravaImport} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

function mapStateToProps(auth) {
  return auth
}

export default connect(mapStateToProps, actions)(App)
