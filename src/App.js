import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from "react-redux"
import ReactPexel from './containers/ReactPexel/ReactPexel'
import Layout from "./hoc/Layout/Layout"
import Auth from "./containers/Auth/Auth"
import * as actions from './store/actions/index';
import Logout from "./containers/Auth/Logout/Logout"
import MyPexels from "./containers/MyPexels/MyPexels"
import NewPexel from "./containers/NewPexel/NewPexel"

class App extends Component {

  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" exact component={Auth} />
        <Route path="/" exact component={ReactPexel} />
        <Redirect to="/" />
      </Switch>
    );

    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/" exact component={ReactPexel} />
          <Route path="/logout" component={Logout} />
          <Route path="/pexels/my" component={MyPexels} />
          <Route path="/pexels/new" component={NewPexel} />
          <Redirect to="/" />
        </Switch>
      )
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
